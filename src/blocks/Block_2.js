import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_2 = (props) => {
  const [mouse, set_mouse] = useState({ x: 100, y: 250 })
  const [ref, set_ref] = useState(null)

  useEffect(() => {
    if (!ref) return
    const update_mouse = (e) => set_mouse({ x: e.clientX / 3, y: e.clientY })
    ref.addEventListener('mousemove', update_mouse)
    return () => ref.removeEventListener('mousemove', update_mouse)
  }, [ref])

  return (
    <Wrapper elemRef={set_ref} {...props}>
      {circles.map((index) => (
        <Circle
          key={index}
          style={{
            transform: `rotate(${index * 45}deg)`,
            width: index % 2 ? mouse.x : mouse.y,
            height: index % 2 ? mouse.y : mouse.x,
            ...props.style,
          }}
        />
      ))}
    </Wrapper>
  )
}

const circles = [...Array(4).keys()]
const Wrapper = Component.flex.ai_center.jc_center.section()
const Circle = Component.absolute.f_invert100.b_rad50p.div()
