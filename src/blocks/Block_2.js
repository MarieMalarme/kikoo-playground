import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_2 = ({ color }) => {
  const [mouse, set_mouse] = useState({ x: 100, y: 250 })
  const [wrapper, set_wrapper] = useState(null)

  const update_mouse = (event) =>
    set_mouse({
      x: event.clientX - wrapper.offsetParent.offsetLeft,
      y: event.clientY - wrapper.offsetParent.offsetTop - window.pageYOffset,
    })

  return (
    <Wrapper onMouseMove={update_mouse} elemRef={set_wrapper}>
      {circles.map((index) => {
        const x = mouse.x / 3.5 + 30
        const y = mouse.y / 2 + 130

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
