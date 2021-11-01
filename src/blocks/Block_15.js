import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_15 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [canvas, set_canvas] = useState(null)
  const [context, set_context] = useState(null)
  const [clicked, set_clicked] = useState(false)

  useEffect(() => {
    if (!canvas) return
    // get & set the context of the canvas
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'xor' // set a mask effect
    set_context(ctx)

    // draw some blobs on canvas load
    const { width, height } = canvas.getBoundingClientRect()
    for (let i = 0; i < 5; i++) {
      draw_blob({
        x: random(30, width - 30),
        y: random(30, height - 30),
        context: ctx,
        color: color.value,
      })
    }
  }, [canvas, color.value])

  return (
    <Wrapper elemRef={set_wrapper}>
      {!clicked && (
        <Instruction>Click anywhere to draw more shapes!</Instruction>
      )}
      <Canvas
        elemRef={set_canvas}
        width={wrapper?.getBoundingClientRect().width}
        height={wrapper?.getBoundingClientRect().height}
        onClick={(event) => {
          !clicked && set_clicked(true)

          const { top, left } = canvas.getBoundingClientRect()
          draw_blob({
            x: event.pageX - left,
            y: event.pageY - window.pageYOffset - top,
            context,
            color: color.value,
          })
        }}
      />
    </Wrapper>
  )
}

const draw_blob = ({ x, y, context, color }) => {
  const bezier_curves = generate_bezier_curve({ x, y })

  const start_point = `M${bezier_curves[0].x1}, ${bezier_curves[1].y1}`
  const bezier_curve = bezier_curves.reduce((path, curve) => {
    const next_bezier_curve = `S${curve.x2}, ${curve.y2}, ${curve.x1}, ${curve.y1}`
    return `${path} ${next_bezier_curve}`
  }, start_point)

  const path = new Path2D(bezier_curve)
  context.fillStyle = color
  context.fill(path)
}

const generate_bezier_curve = ({ x, y }) => {
  const radius = random(60, 120)
  const curves_amount = [...Array(random(4, 5)).keys()]
  const angle_chunk = 360 / curves_amount.length

  const bezier_curves = curves_amount.map((index) => {
    const min_degree = index * angle_chunk
    const max_degree = (index + 1) * angle_chunk - angle_chunk / 2
    const angle = random(min_degree, max_degree)
    const degrees = [(angle * Math.PI) / 180, ((angle - 20) * Math.PI) / 180]

    return {
      x1: x + radius * Math.sin(degrees[0]),
      y1: y + radius * Math.cos(degrees[0]),
      x2: x + radius * Math.sin(degrees[1]),
      y2: y + radius * Math.cos(degrees[1]),
    }
  })

  return [...bezier_curves, bezier_curves[0]] // add the origin point in the end to close the shape
}

const Wrapper = Component.flex.ai_center.jc_center.article()
const Instruction =
  Component.zi1.o75.fs15.flex.ai_center.jc_center.pa10.events_none.w15vmin.h15vmin.b_rad50p.bg_grey1.text_center.absolute.span()
const Canvas = Component.f_invert100.canvas()
