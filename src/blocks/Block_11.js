import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_11 = ({ color, is_selected }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!wrapper) return

    const update_mouse = (event) => {
      const { width, height } = wrapper.getBoundingClientRect()
      // translate the mouse position in the page to the coordinate system of the block
      const translator_x = width / 2 + wrapper.offsetParent.offsetLeft
      const translator_y = height / 2 + wrapper.offsetParent.offsetTop

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
      pt45={is_selected}
      pl55={is_selected}
      elemRef={set_wrapper}
      style={{
        backgroundImage: `conic-gradient(from ${angle}deg, white, rgba(0, 0, 0, 0))`,
        backgroundColor: color.value,
      }}
    >
      <Measure fs25={is_selected} lh35={is_selected}>
        angle: {displayed_angle.toFixed()}°
      </Measure>
      <Measure fs25={is_selected} lh35={is_selected}>
        x: {mouse.x}
      </Measure>
      <Measure fs25={is_selected} lh35={is_selected}>
        y: {mouse.y}
      </Measure>
    </Wrapper>
  )
}

const Wrapper = Component.pt20.pl25.article()
const Measure = Component.mono.fs12.lh18.div()
