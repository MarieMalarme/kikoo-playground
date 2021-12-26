import React, { useState, useEffect } from 'react'
import { Body, Bodies, Engine, Render, Runner, Common } from 'matter-js'
import { Composites, MouseConstraint, Mouse, Composite } from 'matter-js'
import { get_invert_color } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_29 = ({ color, hovered }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [engine, set_engine] = useState(null)
  const [matter, set_matter] = useState({})

  useEffect(() => set_engine(Engine.create()), [])

  // set up render & create the circles
  useEffect(() => {
    if (!engine || !wrapper) return

    const { width, height } = wrapper.getBoundingClientRect()

    // set up matter-js
    const render = Render.create({
      engine,
      element: wrapper,
      options: { width, height, wireframes: false, background: 'transparent' },
    })

    const runner = Runner.create()
    set_matter({ render, runner })
    Runner.run(runner, engine)
    Render.run(render)

    // create the cloth
    const columns = 5
    const rows = 5
    const radius = width / columns / 2
    const cloth = create_cloth(0, 0, columns, rows, 0.5, radius)

    for (let i = 0; i < columns; i++) {
      cloth.bodies[i].isStatic = true
    }

    Composite.add(engine.world, [
      cloth,
      // walls
      Bodies.rectangle(0, height + 10, width * 2, 20, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(-10, 0, 10, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(width + 10, 0, 10, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
    ])

    // add mouse control
    const mouse = Mouse.create(render.canvas)
    const mouse_constraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        pointA: { x: -10, y: -10 },
        pointB: { x: -10, y: -10 },
        render: { strokeStyle: get_invert_color(color) },
      },
    })
    Composite.add(engine.world, mouse_constraint)
    render.mouse = mouse // keep the mouse in sync with rendering

    // enable scroll events that are disabled by matter-js
    const events_to_remove = ['mousewheel', 'DOMMouseScroll']
    events_to_remove.forEach((event) => {
      mouse_constraint.mouse.element.removeEventListener(
        event,
        mouse_constraint.mouse.mousewheel,
      )
    })
  }, [engine, wrapper, color])

  useEffect(() => {
    if (!engine || !matter.render || !matter.runner) return
    matter.runner.enabled = hovered
    matter.render.options.enabled = hovered
  }, [engine, matter.render, matter.runner, hovered])

  return <Wrapper elemRef={set_wrapper}></Wrapper>
}

const Wrapper = Component.article()

const create_cloth = (x, y, columns, rows, gap, radius) => {
  const group = Body.nextGroup(true)
  const particle_options = Common.extend({
    inertia: Infinity,
    friction: 0.00001,
    collisionFilter: { group: group },
    render: { visible: false },
  })

  const constraint_options = Common.extend({
    stiffness: 0.1,
    render: { type: 'line' },
  })

  const cloth = Composites.stack(x, y, columns, rows, gap, gap, (x, y) =>
    Bodies.circle(x, y, radius, particle_options),
  )

  Composites.mesh(cloth, columns, rows, false, constraint_options)

  return cloth
}
