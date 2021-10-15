import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_8 = ({ color }) => {
  const [hovered, set_hovered] = useState('hue')

  const [hsl, set_hsl] = useState({ ...color })
  const hsl_string = `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.luminosity}%)`

  return (
    <Wrapper
      className="color-ranges"
      style={{ background: hsl_string, '--block-8-color': hsl_string }}
    >
      <Label style={{ color: hsl_string }}>{hsl_string}</Label>

      {inputs.map((name) => (
        <Input
          type="range"
          min={0}
          max={name === 'hue' ? 360 : 100}
          defaultValue={hsl[name]}
          onMouseOver={() => set_hovered(name)}
          onInput={(event) =>
            set_hsl({ ...hsl, [name]: Number(event.target.value) })
          }
        />
      ))}

      <Label style={{ color: hsl_string }}>
        {hovered}: {hsl[hovered]}
      </Label>
    </Wrapper>
  )
}

const inputs = ['hue', 'saturation', 'luminosity']
const Wrapper =
  Component.ph50.pv15.flex.flex_wrap.flex_column.ai_center.jc_around.section()
const Label = Component.mono.f_invert100.h30.flex.ai_center.label()
const Input = Component.f_invert100.input()
