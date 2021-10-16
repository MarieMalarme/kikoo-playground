import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_11 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!wrapper) return

    const update_mouse = (event) => {
      const { width, height } = wrapper.getBoundingClientRect()
      // translate the mouse position in the page to the coordinate system of the block
      const translator_x = width / 2 + wrapper.offsetLeft
      const translator_y = height / 2 + wrapper.offsetTop

      set_mouse({
        x: event.pageX - translator_x,
        y: -(event.pageY - translator_y),
      })
    }

    wrapper.addEventListener('mousemove', update_mouse)
    return () => wrapper.removeEventListener('mousemove', update_mouse)
  }, [wrapper])

  const angle = (Math.atan2(mouse.x, mouse.y) * 180) / Math.PI
  const displayed_angle = angle > 0 ? angle : 360 + angle

  return (
    <Wrapper
      elemRef={set_wrapper}
      style={{
        backgroundImage: `conic-gradient(from ${angle}deg, white, rgba(0, 0, 0, 0))`,
        backgroundColor: color.value,
      }}
    >
      <Measure>angle: {displayed_angle.toFixed()}°</Measure>
      <Measure>x: {mouse.x}</Measure>
      <Measure>y: {mouse.y}</Measure>
    </Wrapper>
  )
}

const Wrapper = Component.pt20.pl25.section()
const Measure = Component.mono.fs12.lh18.div()
