import { useState } from 'react'
import { random } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_34 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)

  return (
    <Wrapper elemRef={set_wrapper}>
      {elements.map((boolean, index) => (
        <Element
          key={index}
          wrapper={wrapper}
          color={color}
          index={index}
          boolean={boolean}
        />
      ))}
    </Wrapper>
  )
}

const Element = ({ wrapper, color, index, boolean }) => {
  const base_opacity = boolean ? random(0, 100) / 100 : 1
  const [opacity, set_opacity] = useState(base_opacity)
  const wrapper_width = wrapper?.getBoundingClientRect().width || 0
  const wrapper_height = wrapper?.getBoundingClientRect().height || 0
  const width = wrapper_width / side_amount
  const height = wrapper_height / side_amount

  return (
    <Chunk
      onMouseOver={() => opacity && set_opacity(opacity - 0.2)}
      style={{ opacity, width, height, background: color.value }}
    />
  )
}

const side_amount = 20
const amount = side_amount * side_amount

const elements = Array(amount)
  .fill()
  .map(() => random(0, 1))

const Wrapper =
  Component.blend_exclusion.w100p.h100p.flex.flex_wrap.ac_center.article()
const Chunk =
  Component.f_invert100.fs9.white.lh20.flex.ai_center.jc_center.div()
