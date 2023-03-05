import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_38 = ({ hovered, color }) => {
  const [value, set_value] = useState(min)

  return (
    <Wrapper
      style={{
        background: `
        repeating-conic-gradient(from ${value * 4}deg, 
        pink 0deg 10deg, palegreen 10deg 20deg)
      `,
      }}
    >
      <Emoji zi2 style={{ fontSize: `${value}vw` }}>
        👊
      </Emoji>
      <Input
        onInput={(event) => set_value(Number(event.target.value))}
        defaultValue={value}
        type="range"
        min={min}
        max={max}
      />
    </Wrapper>
  )
}

const min = 6
const max = 17

const Wrapper = Component.flex.ai_center.jc_center.article()
const Emoji = Component.absolute.div()
const Input = Component.absolute.b30.zi3.input()
