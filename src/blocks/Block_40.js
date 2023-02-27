import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_40 = ({ hovered, color }) => {
  const [input_value, set_input_value] = useState(0)

  return (
    <Wrapper>
      <Stripes>
        {stripes.map((index) => (
          <Stripe
            key={index}
            style={{
              background: `linear-gradient(to right, white 0%, white ${input_value}%, transparent ${input_value}%, transparent 100%)`,
              width: `calc(100% / ${stripes_amount})`,
            }}
          />
        ))}
      </Stripes>
      <Shape />
      <Input
        className="range-input-thin"
        onInput={(event) => set_input_value(event.target.value)}
        defaultValue={input_value}
        type="range"
        min={min}
        max={max}
      />
    </Wrapper>
  )
}

const Shape = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <path
      d="M650 137.79C791 19 981.05 209 862.21 350c183.72 15.66 183.72 284.4 0 300.06C981.05 791 791 981.05 650 862.21c-15.66 183.72-284.4 183.72-300.06 0C209 981.05 19 791 137.79 650c-183.72-15.66-183.72-284.4 0-300.06C19 209 209 19 350 137.79c15.63-183.72 284.37-183.72 300 0Z"
      fill="white"
    />
  </Svg>
)

const min = 0
const max = 100
const stripes_amount = 10
const stripes = [...Array(stripes_amount).keys()]

const Wrapper = Component.fs70.flex.ai_center.jc_center.article()
const Stripes = Component.flex.h100p.w100p.absolute.blend_difference.div()
const Stripe = Component.h100p.div()
const Input = Component.absolute.b30.f_invert100.blend_difference.input()
const Svg = Component.w50p.h50p.blend_difference.svg()

// max - (input - min),
