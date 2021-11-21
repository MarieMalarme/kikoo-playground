import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_20 = ({ is_selected }) => {
  const [time, set_time] = useState('pm')
  const [touched, set_touched] = useState()
  const [mouse_y, set_mouse_y] = useState(135)
  const [wrapper, set_wrapper] = useState(null)

  const height = wrapper?.getBoundingClientRect().height

  const luminosity = translate_to_scale(mouse_y / height, 70)
  const weight = translate_to_scale(mouse_y / height, weight_diff) + min_weight
  const top = -translate_to_scale(mouse_y / height, height) + height / 2 || 0

  const handle_wheel = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    set_mouse_y(event.pageY - wrapper.offsetParent.offsetTop)
  }

  useEffect(() => {
    document.body.style.overflow = touched ? 'hidden' : 'auto'
  }, [touched])

  return (
    <Wrapper
      elemRef={set_wrapper}
      onTouchStart={() => set_touched(true)}
      onTouchEnd={() => set_touched()}
      onTouchMove={handle_wheel}
      onMouseMove={handle_wheel}
      style={{ background: `hsl(230, 50%, ${luminosity}%)` }}
    >
      <Period fs100={is_selected} period="pm" time={time} set_time={set_time} />
      <Element
        fs30vw={is_selected}
        lh100vh={is_selected}
        style={{ fontVariationSettings: `"wght" ${weight}`, top }}
      >
        O
      </Element>
      <Period fs100={is_selected} period="am" time={time} set_time={set_time} />
    </Wrapper>
  )
}

const Period = ({ period, time, set_time, ...style }) => (
  <Div
    pt30={period === 'pm'}
    pb30={period === 'am'}
    onMouseEnter={() => set_time(period)}
    className={time !== period && 'block-20 text'}
  >
    <Text bt0={period === 'am'} {...style}>
      <span>{period}</span>
    </Text>
  </Div>
)

const translate_to_scale = (number, max) =>
  Math.round(Math.min(max, Math.max(0, max * number)))

const max_weight = 300
const min_weight = 100
const weight_diff = max_weight - min_weight

const Wrapper = Component.flex.flex_column.ai_center.jc_between.article()
const Element =
  Component.events_none.absolute.lh22vw.fs20vw.fs200__xs.lh300__xs.sun_moon.div()
const Div = Component.ph30.h50p.w100p.div()
const Text =
  Component.ba.h100p.flex.ai_center.jc_center.w100p.b_white.bw3.white.uppercase.fs70.text_center.ls5.p()
