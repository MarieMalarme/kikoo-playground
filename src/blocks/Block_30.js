import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_30 = ({ color }) => {
  const [mouse_y, set_mouse_y] = useState(0)
  const [wrapper, set_wrapper] = useState(null)

  useEffect(() => {
    if (!wrapper) return
    const { height } = wrapper.getBoundingClientRect()
    set_mouse_y(height / 2)

    const resizeObserver = new ResizeObserver(() => {
      const { height } = wrapper.getBoundingClientRect()
      set_mouse_y(height / 2)
    })
    resizeObserver.observe(wrapper)
    return () => resizeObserver.disconnect()
  }, [wrapper])

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  const update_mouse_y = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const client_y =
      event.clientY - (wrapper.offsetParent.offsetTop - window.pageYOffset)
    set_mouse_y(client_y)
  }

  return (
    <Wrapper
      elemRef={set_wrapper}
      onMouseMove={update_mouse_y}
      onTouchMove={update_mouse_y}
    >
      <svg
        height="100%"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'invert(100%)' }}
      >
        <path
          fill={color.value}
          d="m500 87 10.57 332.68 96.32-318.61L531 425.15l175.5-282.82-157.18 293.39 242.71-227.75-227.75 242.71L857.67 293.5 574.85 469l324.08-75.89-318.6 96.32L913 500l-332.67 10.57 318.6 96.32L574.85 531l282.82 175.5-293.39-157.18 227.75 242.71-242.71-227.75L706.5 857.67 531 574.85l75.89 324.08-96.32-318.6L500 913l-10.57-332.67-96.32 318.6L469 574.85 293.5 857.67l157.18-293.39-242.71 227.75 227.75-242.71L142.33 706.5 425.15 531l-324.08 75.89 318.61-96.32L87 500l332.68-10.57-318.61-96.32L425.15 469 142.33 293.5l293.39 157.18-227.75-242.71 242.71 227.75L293.5 142.33 469 425.15l-75.89-324.08 96.32 318.61L500 87z"
        />
      </svg>
      <Filter height={mouse_y}></Filter>
    </Wrapper>
  )
}

const Wrapper = Component.fs100.flex.ai_center.jc_center.article()
const Filter =
  Component.bg_black.w100p.absolute.t0.l0.f_invert100.blend_exclusion.svg()
