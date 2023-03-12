import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { get_invert_color } from '../utils/toolbox'

export const Block_52 = ({ hovered, color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState({ x: 100, y: 100 })

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const { width, height } = wrapper.getBoundingClientRect()
    // translate the mouse position in the page to the coordinate system of the block
    const translator_x = width / 2 + wrapper.offsetParent.offsetLeft
    const translator_y = height / 2 + wrapper.offsetParent.offsetTop
    const x = event.pageX - translator_x
    const y = event.pageY - translator_y

    set_mouse({ x, y })
  }

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  const inverted_color = get_invert_color(color)

  return (
    <Wrapper
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
      elemRef={set_wrapper}
    >
      <Text
        style={{
          color: inverted_color,
          textShadow: `
          ${inverted_color} ${-mouse.x / 1.33}px 0px,
          ${inverted_color} ${mouse.x / 1.33}px 0px,

          ${inverted_color} ${mouse.x / 4}px ${mouse.y / 4}px,
          ${inverted_color} ${-mouse.x / 4}px ${-mouse.y / 4}px,

          ${inverted_color} ${-mouse.x / 4}px ${mouse.y / 4}px,
          ${inverted_color} ${mouse.x / 4}px ${-mouse.y / 4}px,

          ${inverted_color} ${-mouse.x / 2}px ${-mouse.y / 2}px,
          ${inverted_color} ${mouse.x / 2}px ${mouse.y / 2}px,

          ${inverted_color} ${mouse.x / 2}px ${-mouse.y / 2}px,
          ${inverted_color} ${-mouse.x / 2}px ${mouse.y / 2}px,

          ${inverted_color} ${mouse.x / 1.33}px ${mouse.y / 1.33}px,
          ${inverted_color} ${-mouse.x / 1.33}px ${-mouse.y / 1.33}px,

          ${inverted_color} ${-mouse.x / 1.33}px ${mouse.y / 1.33}px,
          ${inverted_color} ${mouse.x / 1.33}px ${-mouse.y / 1.33}px
          `,
        }}
      >
        ╬░▒▓▒░╬
      </Text>
    </Wrapper>
  )
}

const Wrapper = Component.flex.ai_center.jc_center.article()
const Text = Component.absolute.fs30.mono.div()
