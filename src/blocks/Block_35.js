import { useState, useEffect } from 'react'
import { get_invert_color } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_35 = ({ color }) => {
  const [mouse_x, set_mouse_x] = useState(0)
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
  }, [wrapper])

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
      style={{ color: get_invert_color(color), fontSize: width / 9 }}
    >
      <Emoticon mouse_x={mouse_x} is_flower={true} />
      <Emoticon mouse_x={mouse_x} />
      <Emoticon mouse_x={mouse_x} is_flower={true} />
      <Emoticon mouse_x={mouse_x} />
      <Emoticon mouse_x={mouse_x} is_flower={true} />
    </Wrapper>
  )
}

const Emoticon = ({ mouse_x, is_flower }) => (
  <EmoticonWrapper>
    {is_flower ? '(' : '〔'}
    {is_flower && '｡'}
    <Eye style={{ transform: `rotate(${is_flower ? mouse_x : -mouse_x}deg)` }}>
      {is_flower ? '✿' : '⚈'}
    </Eye>
    {is_flower ? '‿' : '｡'}
    <Eye style={{ transform: `rotate(${is_flower ? mouse_x : -mouse_x}deg)` }}>
      {is_flower ? '✿' : '⚈'}
    </Eye>
    {is_flower && '｡'}
    {is_flower ? ')' : '〕'}
  </EmoticonWrapper>
)

const limit = 50

const Wrapper =
  Component.text_center.flex.flex_column.ai_center.jc_center.article()
const EmoticonWrapper = Component.flex.div()
const Eye = Component.flex.ai_center.jc_center.div()
