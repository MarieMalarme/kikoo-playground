import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_5 = () => {
  const [wrapper, set_wrapper] = useState(null)
  const [canvas, set_canvas] = useState(null)
  const [context, set_context] = useState(null)
  const [touched, set_touched] = useState()

  useEffect(() => {
    if (!canvas || !wrapper) return

    // get & set the context of the canvas
    const ctx = canvas.getContext('2d')
    set_context(ctx)

    const { width, height, top, left } = wrapper.getBoundingClientRect()

    // draw a curve on the canvas on load
    let start = { x: width / 10, y: height / 4 }
    const steps = (width / 5).toFixed()
    const points = [...Array(Number(steps)).keys()]

    points.forEach((index) => {
      start.x += random(0, 20)
      start.y += random(-10, 15)

      draw_point({
        x: left + start.x,
        y: top + start.y,
        context: ctx,
        wrapper,
      })
    })

    // event listener to clear the canvas on click
    const { innerWidth, innerHeight } = window
    const clear_canvas = () => ctx.clearRect(0, 0, innerWidth, innerHeight)
    canvas.addEventListener('click', clear_canvas)
    return () => canvas.removeEventListener('click', clear_canvas)
  }, [canvas, wrapper])

  useEffect(() => {
    document.body.style.overflow = touched ? 'hidden' : 'auto'
  }, [touched])

  const draw = (event) => {
    event = event.type === 'touchmove' ? event.changedTouches[0] : event
    draw_point({
      x: event.pageX,
      y: event.pageY - window.pageYOffset,
      context,
      wrapper,
    })
  }

  return (
    <Wrapper elemRef={set_wrapper}>
      <canvas
        ref={set_canvas}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={(event) => draw(event)}
        onTouchMove={(event) => draw(event)}
        onTouchStart={() => set_touched(true)}
        onTouchEnd={() => set_touched()}
      />
    </Wrapper>
  )
}

const draw_point = ({ x, y, context, wrapper }) => {
  if (!context) return

  const { top, left } = wrapper.getBoundingClientRect()

  // set the coordinates according to the position of the canvas' wrapper in the page
  x = x - left
  y = y - top

  context.fillStyle = 'orange'
  context.beginPath()
  context.rect(x - half_point, y - half_point, point_size, point_size)
  context.fill()
}

const point_size = 20
const half_point = point_size / 2
const Wrapper = Component.blend_exclusion.article()
