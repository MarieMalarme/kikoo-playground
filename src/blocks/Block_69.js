import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_69 = ({ is_hovered }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState({ x: 10, y: 10 })

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    // translate the mouse position in the page to the coordinate system of the block
    const translator_x = wrapper.offsetParent.offsetLeft
    const translator_y = wrapper.offsetParent.offsetTop
    const { width, height } = wrapper?.getBoundingClientRect()
    const x = width / 2 - Math.abs(event.pageX - translator_x - width / 2)
    const y = height / 2 - Math.abs(event.pageY - translator_y - height / 2)
    set_mouse({ x, y })
  }

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  return (
    <Wrapper
      elemRef={set_wrapper}
      onMouseMove={update_mouse}
      onTouchMove={update_mouse}
      style={{
        backgroundPosition: `center`,
        backgroundImage: 'linear-gradient(violet 50%, indigo)',
        backgroundSize: `${(mouse.y + 10) / 1.5}px ${(mouse.y + 10) / 1.5}px`,
      }}
    >
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <mask id="mask">
          <rect fill="white" x="0" y="0" width="1000" height="1000" />
          <path
            stroke="black"
            style={{ transform: 'scale(0.75)', transformOrigin: 'center' }}
            d="m827.55 388.67 131.18 51c55 21.4 55 99.26 0 120.66l-131.18 51a379.57 379.57 0 0 0-216.22 216.22l-51 131.18c-21.4 55-99.26 55-120.66 0l-51-131.18a379.57 379.57 0 0 0-216.22-216.22l-131.18-51c-55-21.4-55-99.26 0-120.66l131.18-51a379.57 379.57 0 0 0 216.22-216.22l51-131.18c21.4-55 99.26-55 120.66 0l51 131.18a379.57 379.57 0 0 0 216.22 216.22Z"
          />
        </mask>

        <rect
          x="0"
          y="0"
          width="1000"
          height="1000"
          fill="indigo"
          mask="url(#mask)"
        />
      </Svg>
    </Wrapper>
  )
}

const Wrapper = Component.flex.jc_center.article()
const Svg = Component.w100p.h100p.svg()
