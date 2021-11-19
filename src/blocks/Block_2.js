import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_2 = ({ color }) => {
  const [touched, set_touched] = useState()
  const [mouse, set_mouse] = useState({ x: 100, y: 250 })
  const [wrapper, set_wrapper] = useState(null)

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.changedTouches[0] : event
    set_mouse({
      x: event.pageX - wrapper.offsetParent.offsetLeft,
      y: event.pageY,
    })
  }

  useEffect(() => {
    document.body.style.overflow = touched ? 'hidden' : 'auto'
  }, [touched])

  return (
    <Wrapper
      onTouchStart={() => set_touched(true)}
      onTouchEnd={() => set_touched()}
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
      elemRef={set_wrapper}
    >
      {circles.map((index) => {
        const x = mouse.x / 3.5 + 30
        const y = mouse.y / 3.5 + 100

        return (
          <Circle
            key={index}
            style={{
              transform: `rotate(${index * 45}deg)`,
              height: index % 2 ? y : x,
              width: index % 2 ? x : y,
              background: color.value,
            }}
          />
        )
      })}
    </Wrapper>
  )
}

const circles = [...Array(4).keys()]
const Wrapper = Component.flex.ai_center.jc_center.article()
const Circle = Component.absolute.f_invert100.b_rad50p.div()
