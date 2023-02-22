import { useState, useEffect } from 'react'
import { get_invert_color } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_39 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [count, set_count] = useState(0)
  const colors = [color.value, get_invert_color(color)]

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  return (
    <Wrapper
      elemRef={set_wrapper}
      onMouseMove={() => set_count(count + 1)}
      onTouchMove={() => set_count(count + 1)}
    >
      <Gradient
        style={{
          background: `repeating-conic-gradient(from ${count}deg at 50%, ${colors[0]} 5deg, ${colors[1]} 20deg)`,
        }}
      />
    </Wrapper>
  )
}

const Wrapper = Component.article()
const Gradient = Component.h100p.w100p.div()
