import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_41 = () => {
  const [wrapper, set_wrapper] = useState(null)
  const [canvas, set_canvas] = useState(null)

  useEffect(() => {
    if (!canvas || !wrapper) return
    // get & set the context of the canvas
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    context.globalCompositeOperation = 'xor'

    name.forEach((letter, index) => {
      const is_vowel = vowels.includes(letter)

      is_vowel
        ? draw_flower({ index, wrapper, letter, context })
        : draw_curve({ wrapper, context, letter, index })
    })
  }, [canvas, wrapper])

  return (
    <Wrapper elemRef={set_wrapper}>
      <Canvas
        elemRef={set_canvas}
        width={wrapper?.getBoundingClientRect().width}
        height={wrapper?.getBoundingClientRect().height}
      />
    </Wrapper>
  )
}

const draw_curve = ({ context, wrapper, letter, index }) => {
  const char_code = letter.charCodeAt(0) - 65
  const { width, height } = wrapper.getBoundingClientRect()

  const start = [
    index % 2
      ? (char_code * width) / max_char_code
      : width - (char_code * width) / max_char_code,
    index % 2
      ? (char_code * height) / max_char_code
      : height - (char_code * height) / max_char_code,
  ]

  context.beginPath()
  context.moveTo(start[0], start[1])

  context.bezierCurveTo(
    char_code + (index % 2 ? 200 : -200),
    char_code + (index % 3 ? 400 : -100),

    char_code + (index % 3 ? -200 : 500),
    char_code + (index % 2 ? 100 : -800),

    start[0] + (char_code * width) / max_char_code + (index % 3 ? 200 : -100),
    start[1] + (char_code * height) / max_char_code + (index % 4 ? -200 : 150),
  )

  context.lineWidth = char_code
  context.lineJoin = 'round'
  context.lineCap = 'round'
  context.fill()
}

const draw_flower = ({ context, index, wrapper, letter }) => {
  const { width, height } = wrapper.getBoundingClientRect()
  const char_code = letter.charCodeAt(0) - 65

  const start = [
    index % 2
      ? (char_code * width) / max_char_code
      : width - (char_code * width) / max_char_code,
    index % 2
      ? (char_code * height) / max_char_code
      : height - (char_code * height) / max_char_code,
  ]

  const bezier_curves = generate_bezier_curve({
    x: start[0],
    y: start[1],
    char_code,
    index,
  })

  const start_point = `M${bezier_curves[0].x1}, ${bezier_curves[1].y1}`
  const bezier_curve_path = bezier_curves.reduce((path, curve) => {
    const next_bezier_curve = `S${curve.x2}, ${curve.y2}, ${curve.x1}, ${curve.y1}`
    return `${path} ${next_bezier_curve}`
  }, start_point)

  const path = new Path2D(bezier_curve_path)
  context.lineWidth = 1
  context.fill(path)
}

const generate_bezier_curve = ({ x, y, char_code, i }) => {
  const radius = char_code * 1.5
  const curves_amount = [...Array(i % 3 ? 5 : 8).keys()]
  const angle_chunk = 360 / curves_amount.length

  const bezier_curves = curves_amount.map((index) => {
    const angle = index * angle_chunk
    const degrees = [(angle * Math.PI) / 50, ((angle - 20) * Math.PI) / 50]

    return {
      x1: x + radius * Math.sin(degrees[0] + char_code) - char_code,
      y1: y + radius * Math.cos(degrees[0] + char_code) + char_code,
      x2: x + radius * Math.sin(degrees[1]) + char_code,
      y2: y + radius * Math.cos(degrees[1]) + char_code,
    }
  })

  return [...bezier_curves, bezier_curves[0]] // add the origin point in the end to close the shape
}

const max_char_code = 122
const vowels = ['a', 'e', 'i', 'o', 'u', 'y']
const name = [...new Set('Marie Malarme'.split(''))]

const Wrapper = Component.article()
const Canvas = Component.canvas()
