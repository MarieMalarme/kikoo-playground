import { useState } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_1 = ({ color, ...props }) => {
  const [text, set_text] = useState('Bonjour')
  const [increment, set_increment] = useState(50)

  return (
    <Wrapper id="block-1" {...props}>
      {texts.map((transform, index) => (
        <Text
          key={index}
          text={text}
          color={color}
          transform={transform}
          increment={increment}
        />
      ))}
      <Inputs>
        <TextInput
          spellCheck="false"
          defaultValue="Type here!"
          onInput={(event) => set_text(event.target.value)}
          type="text"
          {...props}
        />
        <RangeInput
          min={0}
          max={360}
          defaultValue={increment}
          onInput={(event) => set_increment(Number(event.target.value))}
          type="range"
          {...props}
        />
      </Inputs>
    </Wrapper>
  )
}

const Text = ({ text, color, transform, increment }) => {
  let { rotation, scale, skew } = transform
  rotation = rotation + increment
  return (
    <Span
      style={{
        color: `hsl(${color.hue + 100}, 80%, 60%)`,
        transform: `rotate(${rotation}deg) scale(${scale.x}, ${scale.y}) skew(${skew.x}deg, ${skew.y}deg)`,
      }}
    >
      {text}
    </Span>
  )
}

const texts = [...Array(5).keys()].map(() => ({
  rotation: random(0, 360),
  scale: { x: random(2, 10), y: random(1, 6) },
  skew: { x: random(1, 10), y: random(1, 10) },
}))

const Wrapper = Component.flex.ai_center.jc_center.section()
const Span = Component.fs30.span()
const Inputs = Component.flex.flex_column.absolute.t20.l20.div()
const TextInput =
  Component.b_rad25.black.f_invert100.pv5.ph15.w150.fs25.ol_none.bg_none.ba0.input()
const RangeInput = Component.mt10.f_invert100.input()
