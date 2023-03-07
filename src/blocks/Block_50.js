import { useState, useEffect } from 'react'
import { Component, Div } from '../utils/flags'
import { get_invert_color } from '../utils/toolbox'

export const Block_50 = ({ is_selected, hovered, color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [shadows_amount, set_shadows_amount] = useState(4)
  const [distance, set_distance] = useState(4)
  const [colors, set_colors] = useState({
    text: '#ffffff',
    background: '#ee82ee',
    shadow: '#0000ff',
  })

  const is_negative = shadows_amount < 0
  const items = [...Array(Math.abs(shadows_amount)).keys()]
  const shadows = items.map((index) => {
    const inc = distance * (index + 1)
    const position = is_negative ? -inc : inc
    return `${colors.shadow} ${position}px ${position}px`
  })

  return (
    <Wrapper
      tabIndex="0"
      elemRef={set_wrapper}
      style={{ background: colors.background }}
    >
      <div>
        <Text absolute style={{ color: colors.text }}>
          Sans rigoler. Je pratique la MMA depuis maintenant 6 ans.
        </Text>
        <Text style={{ textShadow: shadows.join(', ') }}>
          Sans rigoler. Je pratique la MMA depuis maintenant 6 ans.
        </Text>
      </div>

      <Inputs>
        <InputWrapper>
          Shadows
          <Input
            className="range-input-thin "
            onInput={(event) => set_shadows_amount(Number(event.target.value))}
            min={-20}
            max={20}
            type="range"
            value={shadows_amount}
          />
        </InputWrapper>

        <InputWrapper ml30>
          Distance
          <Input
            className="range-input-thin "
            onInput={(event) => set_distance(Number(event.target.value))}
            min={1}
            max={5}
            type="range"
            value={distance}
          />
        </InputWrapper>

        <InputWrapper ml30>
          Text
          <ColorInput
            type="color"
            value={colors.text}
            onInput={(event) =>
              set_colors({ ...colors, text: event.target.value })
            }
          />
        </InputWrapper>

        <InputWrapper ml15>
          Shadow
          <ColorInput
            type="color"
            value={colors.shadow}
            onInput={(event) =>
              set_colors({ ...colors, shadow: event.target.value })
            }
          />
        </InputWrapper>

        <InputWrapper ml15>
          Background
          <ColorInput
            type="color"
            value={colors.background}
            onInput={(event) =>
              set_colors({ ...colors, background: event.target.value })
            }
          />
        </InputWrapper>
      </Inputs>
    </Wrapper>
  )
}

const Wrapper = Component.fs60.flex.jc_center.article()
const Text = Component.pv30.ph40.w100p.fs60.flex.jc_center.div()
const Inputs =
  Component.bg_white.fs12.absolute.b20.pa10.pl15.b_rad25.flex.ai_center.div()
const InputWrapper = Component.flex.ai_center.div()
const ColorInput = Component.ml7.input()
const Input = Component.ml10.w60.input()
