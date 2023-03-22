import { useState } from 'react'
import { Component } from '../utils/flags'

// try with mouse move to move around like a shadow with the sun

export const Block_45 = ({ is_selected, color }) => {
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
    <Wrapper tabIndex="0" style={{ background: colors.background }}>
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

        <InputWrapper ml30 ml20__xs>
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

        <InputWrapper w15p__xs ml30 ml20__xs>
          Text
          <ColorInput
            type="color"
            value={colors.text}
            onInput={(event) =>
              set_colors({ ...colors, text: event.target.value })
            }
          />
        </InputWrapper>

        <InputWrapper w15p__xs ml15>
          Background
          <ColorInput
            type="color"
            value={colors.background}
            onInput={(event) =>
              set_colors({ ...colors, background: event.target.value })
            }
          />
        </InputWrapper>

        <InputWrapper w15p__xs ml15>
          Shadow
          <ColorInput
            type="color"
            value={colors.shadow}
            onInput={(event) =>
              set_colors({ ...colors, shadow: event.target.value })
            }
          />
        </InputWrapper>
      </Inputs>
    </Wrapper>
  )
}

const Wrapper = Component.flex.jc_center.article()
const Text =
  Component.pv30.pv20__xs.ph40.ph30__xs.w100p.fs60.fs45__xs.flex.jc_center.div()
const Inputs =
  Component.w95p__xs.bg_white.fs12.fs10__xs.absolute.b20.pa10.pl15.ph20__xs.b_rad25.flex.ai_center.jc_between__xs.div()
const InputWrapper = Component.flex_column__xs.flex.ai_center.div()
const ColorInput = Component.ml7__d.mt5__xs.input()
const Input = Component.ml10__d.mt10__xs.w60.input()
