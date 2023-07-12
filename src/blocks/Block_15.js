import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_15 = ({ color, is_selected }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [canvas, set_canvas] = useState(null)
  const [context, set_context] = useState(null)
  const [clicked, set_clicked] = useState(false)

  useEffect(() => {
    if (!canvas || !wrapper) return
    // get & set the context of the canvas
    const ctx = canvas.getContext('2d')
    set_context(ctx)

    const wrapper_half = {
      x: wrapper.getBoundingClientRect().width / 2,
      y: wrapper.getBoundingClientRect().height / 2,
    }

    const canvas_center = {
      x: canvas.getBoundingClientRect().width / 2,
      y: canvas.getBoundingClientRect().height / 2,
    }

    const left = canvas_center.x - wrapper_half.x + 30
    const right = canvas_center.x + wrapper_half.x - 30
    const top = canvas_center.y - wrapper_half.y + 30
    const bottom = canvas_center.y + wrapper_half.y - 30

    // draw some blobs on canvas load
    for (let i = 0; i < 5; i++) {
      draw_blob({
        x: random(left, right),
        y: random(top, bottom),
        context: ctx,
        color: color.value,
      })
    }
  }, [canvas, wrapper, color.value])

  return (
    <Wrapper elemRef={set_wrapper}>
      {!clicked && (
        <Instruction>Click anywhere to draw more shapes!</Instruction>
      )}
      <Canvas
        elemRef={set_canvas}
        width={window.innerWidth}
        height={window.innerHeight}
        onDoubleClick={() =>
          context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        }
        onClick={(event) => {
          !clicked && set_clicked(true)

          const { top, left } = canvas.getBoundingClientRect()
          draw_blob({
            context,
            color: color.value,
            x: event.pageX - left,
            y: event.pageY - window.pageYOffset - top,
          })
        }}
      />
    </Wrapper>
  )
}

const draw_blob = ({ x, y, context, color }) => {
  const bezier_curves = generate_bezier_curve({ x, y })

  const start_point = `M${bezier_curves[0].x1}, ${bezier_curves[1].y1}`
  const bezier_curve_path = bezier_curves.reduce((path, curve) => {
    const next_bezier_curve = `S${curve.x2}, ${curve.y2}, ${curve.x1}, ${curve.y1}`
    return `${path} ${next_bezier_curve}`
  }, start_point)

  const path = new Path2D(bezier_curve_path)
  context.globalCompositeOperation = 'xor' // set a mask effect
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
  Component.zi1.o75.fs15.flex.ai_center.jc_center.pa10.events_none.w120.h120.b_rad50p.bg_grey1.text_center.absolute.span()
const Canvas = Component.f_invert100.canvas()
