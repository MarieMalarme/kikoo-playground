import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_33 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState()

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    set_mouse({
      x: event.pageX - wrapper.offsetParent.offsetLeft,
      y: event.pageY - wrapper.offsetParent.offsetTop,
    })
  }

  const coords = mouse
    ? `${100 + mouse.x / 6}deg, ${60 + mouse.y / 8}deg`
    : '295deg, 50deg'

  return (
    <Wrapper
      style={{ background: 'pink' }}
      elemRef={set_wrapper}
      onMouseMove={update_mouse}
    >
      {[...Array(4).keys()].map((index) => (
        <Word
          key={index}
          style={{ color: color.value, transform: `skew(${coords})` }}
        >
          ❤️‍🔥❤️‍🔥❤️‍🔥
        </Word>
      ))}
    </Wrapper>
  )
}

const Wrapper = Component.flex.ai_center.jc_center.fs100.uppercase.article()
const Word = Component.blend_exclusion.div()
