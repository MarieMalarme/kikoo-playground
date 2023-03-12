import { useState } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_55 = ({ color }) => {
  const [colors_amount, set_colors_amount] = useState(base_colors_amount)
  const [repeats, set_repeats] = useState(1)
  const [colors, set_colors] = useState(base_colors)

  return (
    <Wrapper
      style={{
        backgroundSize: `${100 / repeats}% ${100 / repeats}%`,
        backgroundImage: `linear-gradient(${colors
          .map((c) => `${c.color} ${c.percentage}%`)
          .join(', ')})`,
      }}
    >
      {/* add & remove colors */}
      <Buttons>
        <Button
          o20={colors_amount === 2}
          onClick={() => {
            if (colors_amount > 2) {
              const new_amount = colors_amount - 1
              set_colors_amount(new_amount)
              colors.pop()
            }
          }}
        >
          <Icon minus />
        </Button>
        {colors_amount} colors
        <Button
          o20={colors_amount === 8}
          onClick={() => {
            if (colors_amount < 8) {
              const new_amount = colors_amount + 1
              set_colors_amount(new_amount)

              const new_color = generate_color(
                colors_amount,
                colors.at(-1).percentage,
              )

              set_colors([...colors, new_color])
            }
          }}
        >
          <Icon plus />
        </Button>
      </Buttons>

      {/* generate new colors */}
      <GenerateButton
        onClick={() => set_colors(generate_colors(colors_amount))}
      >
        New gradient
      </GenerateButton>

      {/* add & remove colors */}
      <Buttons>
        <Button
          o20={repeats === 1}
          onClick={() => repeats > 1 && set_repeats(repeats - 1)}
        >
          <Icon minus />
        </Button>
        Repeat ×{repeats}
        <Button
          o20={repeats === 8}
          onClick={() => repeats < 8 && set_repeats(repeats + 1)}
        >
          <Icon plus />
        </Button>
      </Buttons>
    </Wrapper>
  )
}

const Icon = ({ plus, minus }) => (
  <svg
    width={15}
    height={15}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 130 130"
  >
    <path
      fill="none"
      stroke="black"
      strokeWidth={8}
      d={(plus && 'M65 15v100M115 65H15') || (minus && 'M115 65H15')}
    />
  </svg>
)

const generate_colors = (colors_amount) => {
  let last_percentage = 0
  const array = [...Array(colors_amount).keys()]
  const colors = array.map(() => {
    const color = generate_color(colors_amount, last_percentage)
    last_percentage = color.percentage
    return color
  })
  return colors
}

const generate_color = (colors_amount, last_percentage) => {
  const hue = random(0, 360)
  const saturation = random(0, 100)
  const luminosity = random(0, 100)
  const color = `hsl(${hue}, ${saturation}%, ${luminosity}%)`

  const inc = last_percentage + 100 / (colors_amount / 2)
  const max = inc > 100 ? 100 : inc
  const percentage = random(last_percentage, max)

  return { color, percentage }
}

const base_colors_amount = 4
const base_colors = generate_colors(base_colors_amount)

const Wrapper = Component.flex.pa20.ai_flex_end.jc_between.article()
const GenerateButton =
  Component.w140.pv5.ph10.bg_white.fs15.b_rad50.flex.ai_center.jc_center.c_pointer.div()
const Buttons =
  Component.w140.pv5.ph10.bg_white.b_rad50.fs15.flex.ai_center.jc_between.div()
const Button =
  Component.bg_white.b_rad50p.flex.ai_center.jc_center.c_pointer.div()
