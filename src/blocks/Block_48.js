import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import glasses from '../images/glasses.webp'

export const Block_48 = ({ color }) => {
  const [mouse, set_mouse] = useState({ x: 0, y: 0 })
  const [wrapper, set_wrapper] = useState(null)
  const [{ width, height }, set_dimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!wrapper) return
    const set = () => {
      const { width, height } = wrapper.getBoundingClientRect()
      set_dimensions({ width, height })
    }

    const resizeObserver = new ResizeObserver(set)
    resizeObserver.observe(wrapper)
    return () => resizeObserver.disconnect()
  }, [wrapper])

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const { offsetTop, offsetLeft } = wrapper.offsetParent
    const client_x = event.clientX - offsetLeft
    const client_y = event.clientY - (offsetTop - window.pageYOffset)
    set_mouse({ x: client_x, y: client_y })
  }

  return (
    <Wrapper
      elemRef={set_wrapper}
      onMouseMove={update_mouse}
      onTouchMove={update_mouse}
    >
      <div
        style={{
          filter: `blur(${
            (Math.abs(mouse.x - width / 2) + Math.abs(mouse.y - height / 2)) /
            20
          }px)`,
        }}
      >
        <Img width={175} alt="glasses" src={glasses} />
      </div>
    </Wrapper>
  )
}

const Wrapper = Component.flex.ai_center.jc_center.article()
const Img = Component.img()
