import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_59 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse_y, set_mouse_y] = useState(0)

  const update_mouse_y = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    // translate the mouse_y position in the page to the coordinate system of the block
    const translator_y = wrapper.offsetParent.offsetTop
    const y = event.pageY - translator_y + 75
    set_mouse_y(y)
  }

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
    set_mouse_y(wrapper.getBoundingClientRect().height)
  }, [wrapper])

  const wrapper_height = wrapper?.getBoundingClientRect().height - 75

  return (
    <Wrapper
      style={{ background: 'lightgoldenrodyellow' }}
      onMouseMove={update_mouse_y}
      elemRef={set_wrapper}
    >
      <Text
        t20
        style={{
          color: 'blue',
          textShadow: shadows,
          opacity: (mouse_y - 150) / wrapper_height || 0,
        }}
      >
        Hover here
      </Text>
      <Text
        b20
        style={{
          color: 'blue',
          textShadow: shadows,
          opacity: 1 - (mouse_y - 75) / wrapper_height || 0,
        }}
      >
        Over there
      </Text>
    </Wrapper>
  )
}

const shadows = [...Array(6).keys()].map(() => '0 0 25px lime').join(', ')

const Wrapper = Component.fs100.flex.flex_column.ai_center.jc_center.article()
const Text = Component.absolute.p()
