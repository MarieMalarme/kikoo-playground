import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import choumi from '../images/choumi.png'

export const Block_26 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState({ x: 50, y: 50 })

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    set_mouse({
      x: event.pageX - wrapper.offsetParent.offsetLeft,
      y: event.pageY - wrapper.offsetParent.offsetTop,
    })
  }

  useEffect(() => {
    if (!wrapper) return
    set_mouse({
      x: wrapper.getBoundingClientRect().width / 2,
      y: wrapper.getBoundingClientRect().height / 2,
    })
  }, [wrapper])

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  return (
    <Wrapper
      elemRef={set_wrapper}
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
    >
      <Clip
        style={{
          clipPath: `url(#myClip)`,
          background: `center / cover url(${choumi})`,
          filter: 'grayscale(100%) contrast(180%)',
        }}
      />
      <svg width="0" height="0">
        <defs>
          <clipPath id="myClip">
            <circle r={55} cx={mouse.x - 70} cy={mouse.y} />
            <circle r={55} cx={mouse.x + 70} cy={mouse.y} />
          </clipPath>
        </defs>
      </svg>
    </Wrapper>
  )
}

const Wrapper =
  Component.flex.flex_wrap.ai_center.jc_center.fs100.uppercase.article()
const Clip = Component.w100p.h100p.div()
