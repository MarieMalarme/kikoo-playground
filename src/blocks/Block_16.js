import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_16 = ({ color, is_selected }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse_y, set_mouse_y] = useState(0)

  const height = wrapper?.getBoundingClientRect().height

  const luminosity = translate_to_scale(mouse_y / height, 70)
  const weight = translate_to_scale(mouse_y / height, weight_diff) + min_weight
  const top = -translate_to_scale(mouse_y / height, height) + height / 2 || 0

  const handle_wheel = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    set_mouse_y(event.pageY - wrapper.offsetParent.offsetTop)
  }

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    set_mouse_y(wrapper.getBoundingClientRect().height / 2)

    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
    return () =>
      wrapper.removeEventListener('touchmove', prevent_scroll, {
        passive: false,
      })
  }, [wrapper])

  return (
    <Wrapper
      elemRef={set_wrapper}
      onTouchMove={handle_wheel}
      onMouseMove={handle_wheel}
      style={{ background: `hsl(${color.hue}, 50%, ${luminosity}%)` }}
    >
      <Element
        fs30vw={is_selected}
        lh100vh={is_selected}
        style={{ fontVariationSettings: `"wght" ${weight}`, top }}
      >
        O
      </Element>
    </Wrapper>
  )
}

const translate_to_scale = (number, max) =>
  Math.round(Math.min(max, Math.max(0, max * number)))

const max_weight = 300
const min_weight = 100
const weight_diff = max_weight - min_weight

const Wrapper = Component.flex.flex_column.ai_center.jc_between.article()
const Element =
  Component.events_none.absolute.lh22vw.fs20vw.fs200__xs.lh300__xs.sun_moon.div()
