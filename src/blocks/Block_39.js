import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

const default_tweak = -25
const vowels = ['a', 'e', 'i', 'o', 'u', 'y']

export const Block_39 = () => {
  const [wrapper, set_wrapper] = useState(null)
  const [tweak, set_tweak] = useState(default_tweak)
  const [name, set_name] = useState('Marie Malarme')

  const letters = name.replaceAll(' ', '').split('')

  useEffect(() => {
    if (!wrapper) return
    const existing_canvas = [...document.querySelectorAll('#section-39 canvas')]
    existing_canvas.forEach((canvas) => canvas.remove())
    letters.forEach((letter, index) => {
      const canvas = document.createElement('canvas')
      canvas.id = `${index + 1}_${letter}-${name}`
      canvas.width = wrapper.getBoundingClientRect().width
      canvas.height = wrapper.getBoundingClientRect().height
      canvas.style.transform = `scaleX(${vowels.includes(letter) ? -1 : 1})`

      const context = canvas.getContext('2d')
      draw_shape({ index, letter, wrapper, context, tweak })

      const { width, height } = wrapper.getBoundingClientRect()

      // left top mark
      context.beginPath()
      context.arc(1, 1, 1, 0, 2 * Math.PI)
      context.fill()
      // right top mark
      context.beginPath()
      context.arc(width - 1, 1, 1, 0, 2 * Math.PI)
      context.fill()
      // left bottom mark
      context.beginPath()
      context.arc(1, height - 1, 1, 0, 2 * Math.PI)
      context.fill()
      // right bottom mark
      context.beginPath()
      context.arc(width - 1, height - 1, 1, 0, 2 * Math.PI)
      context.fill()

      wrapper.append(canvas)
    })
  }, [wrapper, name, tweak, letters])

  const download = async () => {
    let count = 0
    const existing_canvas = [...document.querySelectorAll('#section-39 canvas')]

    for (var canvas of existing_canvas) {
      const link = document.createElement('a')
      const image = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream')
      link.href = image
      link.setAttribute('download', `${canvas.id}.png`)
      link.click()
      link.remove()

      count++

      if (count >= 10) {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 1000)
        })
        count = 0
      }
    }
  }

  return (
    <Wrapper style={{ background: 'none' }} elemRef={set_wrapper}>
      <Inputs>
        <Input
          type="text"
          defaultValue={name}
          onChange={(event) => set_name(event.target.value)}
        />
        <button onClick={(event) => set_tweak(Number(tweak - 1))}>-</button>
        <div>{tweak}</div>
        <button onClick={(event) => set_tweak(Number(tweak + 1))}>+</button>

        <button onClick={download}>Download</button>
      </Inputs>
    </Wrapper>
  )
}

const get_start_coords = (wrapper, char_code, index) => {
  const { width, height } = wrapper.getBoundingClientRect()

  const scale = {
    x: (char_code * width) / max_char_code,
    y: (char_code * height) / max_char_code,
  }

  const start = {
    x: (index % 2 ? scale.x : width - scale.x) - 50,
    y: (index % 2 ? scale.y : height - scale.y) - 100,
  }

  return { start, scale }
}

const pattern_types = {
  cross: {
    type: 'path',
    elements: (props) => `<line x1="24" y1="24" x2="106" y2="106" ${props} />,
      <line x1="106" y1="24" x2="24" y2="106" ${props} />`,
  },
  plus: {
    type: 'path',
    elements: (props) => `<line x1="65" y1="15" x2="65" y2="115" ${props} />,
      <line x1="115" y1="65" x2="15" y2="65" ${props} />`,
  },
  dot: {
    type: 'shape',
    elements: (props) => `<circle cx="65" cy="65" ${props} />`,
  },
}

const pattern_params = { sizes: [10, 15], stroke_widths: [10, 5] }

const create_pattern = (letter) => {
  const char_code = letter.charCodeAt(0)
  const pattern_index = char_code % 3
  const pattern = Object.values(pattern_types)[pattern_index]

  const params_index = char_code % 2
  const size = pattern_params.sizes[params_index]
  const stroke_width = pattern_params.stroke_widths[params_index]

  const hue = char_code * 100
  const saturation = (char_code * 90) / max_char_code
  const luminosity = (char_code * 70) / max_char_code
  const color = `hsl(${hue}, ${saturation}%, ${luminosity}%)`

  const is_path = pattern.type === 'path'
  const path_props = `stroke-width="${stroke_width}" stroke="${color}"`
  const shape_props = `fill="${color}" r="18"`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 130 130">
    ${pattern.elements(is_path ? path_props : shape_props)}
  </svg>`
}

const draw_shape = ({ context, wrapper, letter, index, tweak }) => {
  const char_code = letter.charCodeAt(0) + tweak
  const { start } = get_start_coords(wrapper, char_code, index)

  const bezier_curves = generate_bezier_curve({ start, char_code, index })
  const start_point = `M${bezier_curves[0].x1}, ${bezier_curves[1].y1}`
  const bezier_curve_path = bezier_curves.reduce((path, curve) => {
    const next_bezier_curve = `S${curve.x2}, ${curve.y2}, ${curve.x1}, ${curve.y1}`
    return `${path} ${next_bezier_curve}`
  }, start_point)

  const path = new Path2D(bezier_curve_path)

  const blob = new Blob([create_pattern(letter)], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  const img = new Image()
  img.src = url
  img.onload = () => {
    const pattern = context.createPattern(img, 'repeat')
    context.fillStyle = pattern
    context.fill(path)
  }
}

const generate_bezier_curve = ({ start, char_code, index }) => {
  const radius = char_code * 2
  const curves_amount = [...Array(index % 3 ? 5 : 8).keys()]
  const angle_chunk = 360 / curves_amount.length

  const bezier_curves = curves_amount.map((index) => {
    const angle = index * angle_chunk
    const degrees = [(angle * Math.PI) / 50, ((angle - 25) * Math.PI) / 50]

    return {
      x1: start.x + radius * Math.sin(degrees[0] + char_code) - char_code,
      y1: start.y + radius * Math.cos(degrees[0] + char_code) + char_code,
      x2: start.x + radius * Math.sin(degrees[1]) + char_code,
      y2: start.y + radius * Math.cos(degrees[1]) + char_code,
    }
  })

  return [...bezier_curves, bezier_curves[0]] // add the origin point in the end to close the shape
}

const max_char_code = 122

const Wrapper = Component.article()
const Inputs = Component.zi1.absolute.t20.l20.flex.flex_column.div()
const Input = Component.mb10.input()
