import { useState, useEffect } from 'react'
import { random, get_invert_color } from '../utils/toolbox'
import { Component } from '../utils/flags'
import { Arrow } from '../icons'

export const Block_24 = ({ hovered, color }) => {
  //states hooks
  const [has_started, set_has_started] = useState(false)
  const [wrapper, set_wrapper] = useState(null)
  const [canvas, set_canvas] = useState(null)
  const [context, set_context] = useState(null)
  const [treasures, set_treasures] = useState([])
  const [selected_color, set_selected_color] = useState('black')
  const [{ x, y }, set_position] = useState({ x: 0, y: 0 })

  const finished = treasures.length && treasures.every((t) => t.found)

  // init context and draw first items
  useEffect(() => {
    if (!canvas) return
    const context = canvas.getContext('2d')
    set_context(context)

    const colors = generate_colors(color)
    const treasures = generate_treasures(colors, canvas)
    for (const treasure of treasures) draw_treasure(treasure, context)
    set_treasures(treasures)

    draw_avatar(context, 'black', canvas.width / 2, canvas.height)

    set_position({ x: canvas.width / 2, y: canvas.height })
  }, [canvas, color])

  // redraw items with new coordinates & props on key moves
  useEffect(() => {
    if (!context || !hovered || !wrapper) return
    const { width, height } = wrapper.getBoundingClientRect()
    context.clearRect(0, 0, width, height) // optional

    const visible_treasures = treasures.filter((t) => !t.found)
    for (const treasure of visible_treasures) {
      if (has_reached_treasure(x, y, treasure)) {
        treasure.found = true
        selected_color !== treasure.color && set_selected_color(treasure.color)
        continue
      }
      draw_treasure(treasure, context)
    }

    draw_avatar(context, selected_color, x, y)
  }, [context, wrapper, x, y, hovered, selected_color, treasures])

  // focus canvas when the block is hovered; onfocus when not
  useEffect(() => {
    if (!wrapper) return
    hovered ? wrapper.focus() : wrapper.blur()
  }, [hovered, wrapper])

  return (
    <Wrapper
      tabIndex="0"
      elemRef={set_wrapper}
      onKeyDown={(event) => {
        event.preventDefault()
        if (!arrow_keys.includes(event.key) || finished) return
        !has_started && set_has_started(true)
        event.key === 'ArrowDown' && set_position({ x, y: y + 2 })
        event.key === 'ArrowUp' && set_position({ x, y: y - 2 })
        event.key === 'ArrowLeft' && set_position({ x: x - 2, y })
        event.key === 'ArrowRight' && set_position({ x: x + 2, y })
      }}
    >
      {finished ? (
        <Finished>
          <Svg
            viewBox="0 0 30 30"
            width={wrapper.getBoundingClientRect().width / 1.5}
            height={wrapper.getBoundingClientRect().height / 1.5}
          >
            <path fill={get_invert_color(color)} d={flower} />
          </Svg>
          <Congrats style={{ color: color.value }}>CONGRATS!</Congrats>
        </Finished>
      ) : (
        <canvas
          ref={set_canvas}
          width={wrapper?.getBoundingClientRect().width}
          height={wrapper?.getBoundingClientRect().height}
        />
      )}
      {!has_started && (
        <Start>
          <Arrow
            rotation={-90}
            width={20}
            stroke="black"
            stroke_width={10}
            mb5
          />
          <Span>Start</Span>
        </Start>
      )}
    </Wrapper>
  )
}

const draw_avatar = (context, color, x, y) => {
  context.fillStyle = color
  context.fillRect(
    x - (radius * 1.5) / 2,
    y - (radius * 1.5) / 2,
    radius * 1.5,
    radius * 1.5,
  )
}

const draw_treasure = (treasure, context) => {
  const { x, y, color } = treasure
  const test = { x: x - radius, y: y - radius }
  context.translate(test.x, test.y)
  context.fillStyle = color
  context.beginPath()
  const path = new Path2D(flower)
  context.fill(path)
  context.translate(-test.x, -test.y)
}

const has_reached_treasure = (x, y, treasure) =>
  x >= treasure.x - radius * 1.5 &&
  x <= treasure.x + radius * 1.5 &&
  y >= treasure.y - radius * 1.5 &&
  y <= treasure.y + radius * 1.5

const generate_colors = (color) =>
  Array(2)
    .fill()
    .map((e, index) => {
      const { hue, saturation } = color
      const hue_inc = (index + 2) * 100
      return `hsl(${hue + hue_inc}, ${100 - saturation}%, 50%)`
    })

const generate_treasures = (colors, wrapper) =>
  colors.flatMap((color) => {
    const width = wrapper?.getBoundingClientRect().width
    const height = wrapper?.getBoundingClientRect().height

    let items = []
    for (let i = 0; i < 3; i++) {
      const x = random(50, width - 50)
      const y = random(50, height - 50)
      const item = { x, y, found: false, color }
      items.push(item)
    }
    return items
  })

const flower = `
M 18.39, 2.39 
l.85, 2.38, 2.27, -1.08
a 3.6, 3.6, 0, 0, 1, 4.8, 4.8
l -1.08, 2.27, 2.38, 0.85
a 3.6, 3.6, 0, 0, 1, 0, 6.78
l -2.38, 0.85, 1.08, 2.27
a 3.6, 3.6, 0, 0, 1, -4.8, 4.8
l -2.27 -1.08 -0.85, 2.38
a 3.6, 3.6, 0, 0, 1, -6.78, 0
l -0.85, -2.38
L 8.49, 26.31 
a 3.6, 3.6, 0, 0, 1, -4.8, -4.8
l 1.08, -2.27, -2.38, -0.85
a 3.6, 3.6, 0, 0, 1, 0, -6.78
l 2.38 -0.85
L 3.69, 8.49
a 3.6, 3.6, 0, 0, 1, 4.8 -4.8
l 2.27, 1.08, 0.85, -2.38
A 3.6, 3.6, 0, 0, 1, 18.39, 2.39
Z`

const radius = 15
const arrow_keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

const Wrapper = Component.article()
const Finished = Component.w100p.h100p.flex.ai_center.jc_center.div()
const Congrats = Component.fs35.absolute.div()
const Svg = Component.absolute.svg()
const Start = Component.absolute.b20.w100p.text_center.div()
const Span = Component.mb5.div()
