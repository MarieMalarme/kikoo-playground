import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_24 = ({ color }) => {
  const [touched, set_touched] = useState()
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState()

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    set_mouse({
      x: event.pageX - wrapper.offsetParent.offsetLeft,
      y: event.pageY - wrapper.offsetParent.offsetTop,
    })
  }

  useEffect(() => {
    document.body.style.overflow = touched ? 'hidden' : 'auto'
  }, [touched])

  const colors = [color.hue + 200, color.hue + 100]
  const coords = mouse ? `${mouse.x}px ${mouse.y}px` : '50% 50%'
  const definition = `circle at ${coords}`
  const radial = `hsl(${colors[0]}, 50%, 50%), hsl(${colors[1]}, 50%, 50%), transparent 150px`

  return (
    <Wrapper
      elemRef={set_wrapper}
      onTouchStart={() => set_touched(true)}
      onTouchEnd={() => set_touched()}
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
      style={{ backgroundImage: `radial-gradient(${definition}, ${radial})` }}
    />
  )
}

const Wrapper = Component.article()
