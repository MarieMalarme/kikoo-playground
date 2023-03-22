import React, { useState, useEffect } from 'react'
import { Body, Engine, Render, World, Bodies, Runner } from 'matter-js'
import { Component } from '../utils/flags.js'

export const Block_19 = ({ color, is_hovered }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [engine, set_engine] = useState(null)
  const [matter, set_matter] = useState({})
  const [loaded, set_loaded] = useState(false)
  // const [runner, set_runner] = useState()
  const [circle_size, set_circle_size] = useState(base_circle_size)

  // set up engine
  useEffect(() => set_engine(Engine.create()), [])

  // set up render & create the circles
  useEffect(() => {
    if (!engine || !wrapper) return

    const { width, height } = wrapper.getBoundingClientRect()

    const render = Render.create({
      engine,
      element: wrapper,
      options: { width, height, wireframes: false, background: 'transparent' },
    })
    const runner = Runner.create()
    set_matter({ render, runner })
    Runner.run(runner, engine)
    Render.run(render)

    circles.forEach((i) => {
      const { hue, saturation, luminosity } = color
      const fillStyle = `hsl(${hue + 180}, ${100 - saturation}%, ${
        100 - luminosity
      }%)`
      const circle = Bodies.circle(10, 10, base_circle_size, {
        render: { fillStyle, id: `circle-${i + 1}` },
      })
      World.add(engine.world, circle)
    })

    engine.world.gravity.y = 5

    setTimeout(() => set_loaded(true), 1500)
  }, [engine, wrapper, color])

  // resize observer
  useEffect(() => {
    if (!wrapper || !matter.render) return

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = wrapper.getBoundingClientRect()

      // set size of the render & canvas
      matter.render.options.width = width
      matter.render.options.height = height
      matter.render.canvas.width = width
      matter.render.canvas.height = height

      // set positions of the circles
      const circles = get_bodies('Circle', engine)
      circles.map((circle) => {
        Body.setPosition(circle, { x: 10, y: 10 })
        return Body
      })

      // remove existing walls
      const existing_walls = get_bodies('Rectangle', engine)
      existing_walls.forEach((wall) => World.remove(engine.world, wall))

      // create new walls
      const up = { x: width / 2, width, height: 100 }
      const side = { y: height / 2, width: 100, height }
      const walls = {
        ground: { ...up, y: height + 50 },
        ceiling: { ...up, y: -50 },
        left: { ...side, x: -50 },
        right: { ...side, x: width + 50 },
      }

      Object.values(walls).map(({ x, y, width, height }) => {
        const wall = Bodies.rectangle(x, y, width, height, {
          density: 1,
          isStatic: true,
          render: { fillStyle: color.value },
        })
        World.add(engine.world, wall)
        return World
      })
    })

    resizeObserver.observe(wrapper)
    return () => resizeObserver.disconnect()
  }, [wrapper, matter.render, engine, color.value])

  useEffect(() => {
    if (!engine || !matter.render || !matter.runner) return
    Runner.stop(engine)
    // engine.enabled = !loaded && true||  is_hovered
    matter.runner.enabled = !loaded || is_hovered
    matter.render.options.enabled = !loaded || is_hovered
  }, [engine, matter.render, matter.runner, is_hovered, loaded])

  const set_circles_size = () => {
    const { matches } = window.matchMedia('(max-width: 600px)')
    if (matches) return
    const is_small = circle_size === base_circle_size
    set_circle_size(is_small ? base_circle_size * 2 : base_circle_size)
    const scale = is_small ? 2 : 0.5

    const circles = get_bodies('Circle', engine)
    circles.map((circle) => {
      Body.scale(circle, scale, scale)
      return Body
    })
  }

  const change_gravity = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event

    const { width, height } = wrapper.getBoundingClientRect()
    const { offsetLeft, offsetTop } = wrapper.offsetParent

    const client_x = event.clientX - offsetLeft
    const client_y = event.clientY - (offsetTop - window.pageYOffset)

    const scale = 4
    engine.world.gravity.x = get_coord(client_x, width, scale)
    engine.world.gravity.y = get_coord(client_y, height, scale)
  }

  return (
    <Canvas
      onClick={set_circles_size}
      onMouseMove={change_gravity}
      onTouchMove={change_gravity}
      elemRef={set_wrapper}
    />
  )
}

const get_bodies = (type, engine) =>
  engine.world.bodies.filter((body) => body.label === `${type} Body`)
const get_coord = (position, max, scale) => (position / max) * scale - scale / 2

const circles = Array(15).fill()
const base_circle_size = 35

const Canvas = Component.w100p.h100p.f_invert100.article()
