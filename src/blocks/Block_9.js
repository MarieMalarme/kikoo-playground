import { useState } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'
import galaxy from '../images/galaxy.jpeg'

export const Block_9 = (props) => {
  const [selected_mode, set_selected_mode] = useState('normal')

  return (
    <Wrapper className="blend-mode-grid" {...props}>
      <Image
        style={{
          mixBlendMode: selected_mode,
          background: ` center / cover url(${galaxy})`,
        }}
      />
      {blend_modes.map(([mode, cell]) => (
        <Mode
          key={mode}
          style={{ gridArea: cell }}
          onMouseOver={() => set_selected_mode(mode)}
          bg_white={mode === selected_mode}
          b_white={mode !== selected_mode}
          black={mode === selected_mode}
          ba={mode !== selected_mode}
        >
          {mode}
        </Mode>
      ))}
    </Wrapper>
  )
}

const cells = {}

const generate_cell = () => {
  let cell

  do {
    const cell_column = random(1, 6)
    const cell_row = random(1, 8)
    cell = `${cell_row} / ${cell_column}`
  } while (cells[cell])

  cells[cell] = true
  return cell
}

const blend_modes = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
].map((mode) => [mode, generate_cell()])

const Wrapper = Component.pa10.relative.of_hidden.section()
const Image = Component.absolute.w100p.h100p.div()
const Mode =
  Component.zi1.of_hidden.white.c_pointer.fs7.ls1.uppercase.flex.ai_center.jc_center.pa5.h25.b_rad25.div()
