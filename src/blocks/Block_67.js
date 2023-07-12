import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_67 = ({ color }) => {
  const [stripes_amount, set_stripes_amount] = useState(20)
  const stripes = [...Array(stripes_amount).keys()]

  return (
    <Wrapper>
      <Stripes>
        {stripes.map((index) => (
          <Circle
            key={index}
            style={{
              width: `${(index * 150) / stripes_amount}%`,
              height: `${(index * 150) / stripes_amount}%`,
            }}
          />
        ))}
      </Stripes>
      <Shape />
      <Input
        style={{ transform: 'scale(0.5)' }}
        onInput={(event) => set_stripes_amount(Number(event.target.value))}
        defaultValue={stripes_amount}
        type="range"
        min={min}
        max={max}
      />
    </Wrapper>
  )
}

const Circle = Component.blend_difference.b_rad50p.absolute.bg_white.div()

const Shape = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <path
      fill="white"
      style={{ mixBlendMode: 'difference' }}
      d="M564.92,57.17l23.6,185.33a65.45,65.45,0,0,0,90.22,52.09L851,222.37c70.87-29.71,126.08,65.91,64.92,112.44l-148.7,113.1a65.45,65.45,0,0,0,0,104.18L916,665.19c61.16,46.53,5.95,142.15-64.92,112.44l-172.3-72.22a65.45,65.45,0,0,0-90.22,52.09l-23.6,185.33c-9.71,76.23-120.13,76.23-129.84,0L411.48,757.5a65.45,65.45,0,0,0-90.22-52.09L149,777.63C78.09,807.34,22.88,711.72,84,665.19l148.7-113.1a65.45,65.45,0,0,0,0-104.18L84,334.81c-61.16-46.53-6-142.15,64.92-112.44l172.3,72.22a65.45,65.45,0,0,0,90.22-52.09l23.6-185.33C444.79-19.06,555.21-19.06,564.92,57.17Z"
    />
  </Svg>
)

const min = 10
const max = 100

const Wrapper = Component.fs70.flex.ai_center.jc_center.article()
const Stripes =
  Component.flex.h100p.w100p.ai_center.jc_center.absolute.blend_difference.div()
const Input = Component.absolute.b20.w300.input()
const Svg = Component.h70p.w70p.of_visible.svg()

// max - (input - min),
