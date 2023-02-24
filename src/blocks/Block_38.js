import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_38 = ({ hovered, color }) => {
  const [font_size, set_font_size] = useState(min)

  return (
    <Wrapper>
      <Emoji style={{ fontSize: `${font_size}vw` }}>👊</Emoji>
      <Input
        onInput={(event) => set_font_size(event.target.value)}
        defaultValue={font_size}
        type="range"
        min={min}
        max={max}
      />
    </Wrapper>
  )
}

const min = 4
const max = 15

const Wrapper = Component.flex.ai_center.jc_center.article()
const Emoji = Component.absolute.div()
const Input = Component.absolute.b30.input()
