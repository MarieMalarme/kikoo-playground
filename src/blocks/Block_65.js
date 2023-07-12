import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_65 = ({ color }) => {
  const [mouse, set_mouse] = useState({ x: 100, y: 100 })
  const [wrapper, set_wrapper] = useState(null)

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const { width, height } = wrapper.getBoundingClientRect()
    // translate the mouse position in the page to the coordinate system of the block
    const translator_x = width / 2 + wrapper.offsetParent.offsetLeft
    const translator_y = height / 2 + wrapper.offsetParent.offsetTop
    const x = event.pageX - translator_x
    const y = -(event.pageY - translator_y)
    set_mouse({ x, y })
  }

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  const angle = (Math.atan2(mouse.x, mouse.y) * 180) / Math.PI

  return (
    <Wrapper
      style={{ background: 'hsl(261, 60%, 67%)' }}
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
      elemRef={set_wrapper}
    >
      <svg
        width="9%"
        viewBox="0 0 101.32 560"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <path
          fill="red"
          d="M72.21 234.15 51.31 0 30.45 233.54A50.67 50.67 0 0 0 0 280h101.32a50.66 50.66 0 0 0-29.11-45.85Z"
        />
        <path d="M101.32 280H0a50.64 50.64 0 0 0 29.78 46.15L50.66 560l20.88-233.85A50.66 50.66 0 0 0 101.32 280Z" />
      </svg>

      <Directions h100p flex_column>
        <div>N</div>
        <div>S</div>
      </Directions>

      <Directions w100p>
        <div>W</div>
        <div>E</div>
      </Directions>
    </Wrapper>
  )
}

const Wrapper = Component.flex.ai_center.jc_center.article()
const Directions =
  Component.fs30.white.pa30.absolute.flex.ai_center.jc_between.div()
