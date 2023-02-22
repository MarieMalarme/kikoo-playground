import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_37 = ({ hovered, color }) => {
  const colors = generate_colors(color)

  //states hooks
  const [wrapper, set_wrapper] = useState(null)
  const [canvas, set_canvas] = useState(null)
  const [context, set_context] = useState(null)
  const [selected_color, set_selected_color] = useState(colors[0])
  const [{ x, y }, set_position] = useState({ x: 100, y: 230 })

  // init context and draw first item
  useEffect(() => {
    if (!canvas) return
    const context = canvas.getContext('2d')
    set_context(context)

    // draw user cursor
    context.fillStyle = selected_color
    context.fillRect(100, 230, 10, 10)
  }, [canvas, selected_color])

  // redraw item with new coordinates on key move
  useEffect(() => {
    if (!context || !hovered) return
    context.fillRect(x, y, 10, 10)
  }, [context, x, y, hovered, selected_color])

  // focus canvas when the block is hovered; onfocus when not
  useEffect(() => {
    if (!wrapper) return
    hovered ? wrapper.focus() : wrapper.blur()
  }, [hovered, wrapper])

  return (
    <Wrapper
      onKeyDown={(event) => {
        const { key } = event
        if (
          key !== 'ArrowDown' &&
          key !== 'ArrowUp' &&
          key !== 'ArrowLeft' &&
          key !== 'ArrowRight'
        )
          return
        event.preventDefault()
        event.key === 'ArrowDown' && set_position({ x, y: y + 1 })
        event.key === 'ArrowUp' && set_position({ x, y: y - 1 })
        event.key === 'ArrowLeft' && set_position({ x: x - 1, y })
        event.key === 'ArrowRight' && set_position({ x: x + 1, y })
      }}
      tabIndex="0"
      elemRef={set_wrapper}
    >
      <canvas
        ref={set_canvas}
        width={wrapper?.getBoundingClientRect().width}
        height={wrapper?.getBoundingClientRect().height}
      />
      <Colors>
        {colors.map((color, index) => {
          return (
            <Color
              key={index}
              style={{ background: color }}
              onClick={() => {
                context.fillStyle = color
                set_selected_color(color)
              }}
            />
          )
        })}
      </Colors>
    </Wrapper>
  )
}

const generate_colors = (color) =>
  Array(3)
    .fill()
    .map((e, index) => {
      const { hue, saturation, luminosity } = color
      const hue_inc = (index + 1) * 100
      return `hsl(${hue + hue_inc}, ${saturation}%, ${luminosity}%)`
    })

const Wrapper = Component.article()
const Colors = Component.absolute.b20.l20.div()
const Color = Component.mt10.c_pointer.h25.w25.b_rad50p.div()
