import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_38 = ({ hovered, color }) => {
  const [mouse_x, set_mouse_x] = useState(150)
  const [wrapper, set_wrapper] = useState(null)
  const [{ width, height }, set_dimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!wrapper) return
    set_dimensions(wrapper.getBoundingClientRect())

    const resizeObserver = new ResizeObserver(() => {
      set_dimensions(wrapper.getBoundingClientRect())
    })
    resizeObserver.observe(wrapper)
    return () => resizeObserver.disconnect()
  }, [wrapper, height, width])

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  const update_mouse_x = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const { offsetLeft } = wrapper.offsetParent
    const client_x = event.clientX - offsetLeft
    const allowed_x = client_x > limit && width - client_x > limit
    if (allowed_x) set_mouse_x(client_x)
  }

  return (
    <Wrapper
      elemRef={set_wrapper}
      onMouseMove={update_mouse_x}
      onTouchMove={update_mouse_x}
      style={{ fontSize: mouse_x / 1.25 }}
    >
      🫶
    </Wrapper>
  )
}

const limit = 50

const Wrapper = Component.flex.ai_center.jc_center.article()
