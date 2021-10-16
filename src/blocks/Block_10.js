import { Fragment, useState, useEffect } from 'react'
import { Component, Div } from '../utils/flags'

export const Block_10 = (props) => {
  const [wrapper, set_wrapper] = useState(null)
  const [clear, set_clear] = useState(15)
  const [pattern, set_pattern] = useState({
    grid: layers.grid[0],
    brush: layers.brush[0],
  })

  return (
    <Wrapper id="block-10" elemRef={set_wrapper} {...props}>
      <Letters
        wrapper={wrapper}
        letter_size={letter_size}
        pattern={pattern}
        clear={clear}
      />
      <Controls
        pattern={pattern}
        set_pattern={set_pattern}
        set_clear={set_clear}
      />
    </Wrapper>
  )
}

const Controls = ({ pattern, set_pattern, set_clear }) => {
  const [open, set_open] = useState(true)

  return (
    <Parameters
      style={{ height: open ? 'calc(100% - 30px)' : '40px' }}
      jc_center={!open}
      ph15={open}
      pv15={open}
      w205={open}
      w40={!open}
    >
      <Toggle mb20={open} jc_center={!open} onClick={() => set_open(!open)}>
        <Arrow rotation={open ? -135 : 45} />
        {open && <Div ml10>Hide settings</Div>}
      </Toggle>
      {open && (
        <Collapsible>
          <Settings pattern={pattern} set_pattern={set_pattern} />
          <Clear onClick={() => set_clear(Date.now())}>Clear</Clear>
        </Collapsible>
      )}
    </Parameters>
  )
}

const Settings = ({ pattern, set_pattern }) => (
  <Div>
    {Object.entries(layers).map(([layer, characters]) => (
      <Div mb20>
        <Label>Choose a {layer}:</Label>
        <Buttons
          characters={characters}
          pattern={pattern}
          set_pattern={set_pattern}
          layer={layer}
        />
        <Input
          type="text"
          placeholder="Type yours..."
          onInput={(event) =>
            set_pattern({ ...pattern, [layer]: event.target.value })
          }
        />
      </Div>
    ))}
  </Div>
)

const Buttons = ({ characters, pattern, set_pattern, layer }) => (
  <Div mt10>
    {characters.map((character, index) => (
      <Button
        bg_grey3={pattern[layer] === character}
        mr5={index !== characters.length - 1}
        onClick={() => set_pattern({ ...pattern, [layer]: character })}
      >
        {character}
      </Button>
    ))}
  </Div>
)

const Letters = ({ wrapper, letter_size, pattern, clear }) => {
  if (!wrapper) return null

  const { width, height } = wrapper.getBoundingClientRect()
  const letters_per_row = Math.ceil(width / letter_size)
  const letters_per_column = Math.ceil(height / letter_size)
  const letters = letters_per_row * letters_per_column

  return (
    <Grid>
      {[...Array(Math.ceil(letters)).keys()].map((index) => (
        <Letter
          key={index}
          letter_size={letter_size}
          pattern={pattern}
          clear={clear}
        />
      ))}
    </Grid>
  )
}

const Letter = ({ letter_size, pattern, clear }) => {
  const [hovered, set_hovered] = useState(false)

  useEffect(() => set_hovered(false), [clear])

  return (
    <Character
      onMouseEnter={() => set_hovered(true)}
      style={{ height: letter_size, width: letter_size }}
    >
      {hovered ? pattern.brush : pattern.grid}
    </Character>
  )
}

const Arrow = ({ rotation }) => (
  <svg
    style={{ transform: `rotate(${rotation}deg)` }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 130 130"
    width="18px"
  >
    <path
      fill="none"
      stroke="var(--grey5)"
      strokeWidth={10}
      d="m72.85 17.6 47.65 47.65-47.65 47.65M5.5 65.25h114.34"
    />
  </svg>
)

const layers = {
  grid: ['.', '+', `|/`, '*-*'],
  brush: ['@', '##', '%%%', '&&&&&'],
}

// add slider to customise letter size
const letter_size = 15
const Wrapper = Component.relative.of_hidden.section()
const Grid = Component.flex.flex_wrap.section()
const Character = Component.c_crosshair.flex.ai_center.jc_center.w10.h10.p()
const Label = Component.fs12.bg_white.pv5.block.ph10.label()
const Parameters =
  Component.b_rad10.bg_blue1.flex.flex_column.absolute.w100p.t0.l0.ma15.header()
const Toggle = Component.mono.c_pointer.flex.ai_center.fs11.grey5.div()
const Collapsible = Component.ofy_scroll.h100p.flex.flex_column.jc_between.div()
const Button =
  Component.c_pointer.w40.fs10.mono.h20.b_rad2.bs_solid.ba.b_grey5.button()
const Input =
  Component.mono.b_rad20.w100p.mt10.ba0.ph10.pv5.ol_none.fs12.input()
const Clear =
  Component.c_pointer.uppercase.ls2.w100p.ba0.mono.bg_black.white.ph10.pv5.b_rad20.button()
