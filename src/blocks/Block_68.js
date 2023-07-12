import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { Select } from '../utils/components'
import { random } from '../utils/toolbox'

export const Block_68 = ({ is_selected }) => {
  const [touch, set_touch] = useState(false)
  const [is_touched, set_is_touched] = useState(false)
  const [is_mouse_down, set_is_mouse_down] = useState(false)
  const [background_mode, set_background_mode] = useState(modes[1])

  return (
    <Wrapper
      onTouchStart={() => set_is_touched(true)}
      onTouchEnd={() => set_is_touched()}
      onMouseDown={() => set_is_mouse_down(true)}
      onMouseUp={() => set_is_mouse_down(false)}
      onTouchMove={(event) => is_touched && set_touch(event.touches[0])}
      style={{
        background: 'white',
        fontSize: is_selected ? '12px' : '14px',
        gridTemplateRows: `repeat(${rows_amount}, 1fr)`,
        gridTemplateColumns: `repeat(${columns_amount}, 1fr)`,
      }}
    >
      {cells.map((backgrounds, index) => (
        <Item
          key={index}
          index={index}
          background={backgrounds[background_mode]}
          touch={touch}
          is_mouse_down={is_mouse_down}
          set_is_mouse_down={set_is_mouse_down}
        />
      ))}

      <Controls
        style={{
          top: is_selected ? 25 : 10,
          left: is_selected ? 25 : 10,
          transformOrigin: 'top left',
          transform: is_selected ? 'scale(1.25)' : '',
        }}
      >
        <Select
          list={modes}
          hover_select={true}
          value={background_mode}
          set_value={set_background_mode}
        />
      </Controls>
    </Wrapper>
  )
}

const Item = ({ index, background, is_mouse_down, touch }) => {
  const [ref, set_ref] = useState(null)
  const [is_on, set_is_on] = useState(false)

  useEffect(() => {
    if (!ref || !touch || is_on) return
    const { top, left, width, height } = ref.getBoundingClientRect()
    const { clientX, clientY } = touch

    const is_touched =
      top >= Math.floor(clientY - 15) &&
      top + height <= Math.ceil(clientY + 15) &&
      left >= Math.floor(clientX - 15) &&
      left + width <= Math.ceil(clientX + 15)
    set_is_on(is_touched)
  }, [ref, touch, is_on])

  return (
    <Cell
      key={index}
      elemRef={set_ref}
      onMouseEnter={() => is_mouse_down && set_is_on(!is_on)}
      style={{ background: is_on ? background : 'white' }}
    >
      <Letter o0={is_on}>H</Letter>
    </Cell>
  )
}

const get_random_color = () => {
  const hue = random(0, 360)
  const saturation = random(0, 100)
  const luminosity = random(0, 100)
  return `hsl(${hue}, ${saturation}%, ${luminosity}%)`
}

const modes = [
  'single color',
  'linear gradient 2 steps',
  'linear gradient 3 steps',
  'single linear gradient',
  'radial gradient 2 steps',
  'radial gradient 3 steps',
  'single radial gradient',
  'conic gradient',
]

const directions = ['right', 'bottom']
const rows_amount = 20
const columns_amount = rows_amount * 2

const single_linear_gradient = `linear-gradient(${get_random_color()}, ${get_random_color()}, ${get_random_color()})`
const single_radial_gradient = `radial-gradient(${get_random_color()}, ${get_random_color()}, ${get_random_color()})`

const cells = [...Array(rows_amount * columns_amount).keys()].map((i) => {
  const color_1 = get_random_color()
  const color_2 = get_random_color()
  const color_3 = get_random_color()
  const direction = directions[random(0, 1)]

  const single_color = color_1
  const linear_gradient_2_steps = `linear-gradient(to ${direction}, ${color_1}, ${color_2})`
  const linear_gradient_3_steps = `linear-gradient(to ${direction}, ${color_1}, ${color_2}, ${color_3})`
  const radial_gradient_2_steps = `radial-gradient(${color_1}, ${color_2})`
  const radial_gradient_3_steps = `radial-gradient(${color_1}, ${color_2}, ${color_3})`
  const conic_gradient = `conic-gradient(${color_1}, ${color_2})`

  return {
    'single color': single_color,
    'linear gradient 2 steps': linear_gradient_2_steps,
    'linear gradient 3 steps': linear_gradient_3_steps,
    'radial gradient 2 steps': radial_gradient_2_steps,
    'radial gradient 3 steps': radial_gradient_3_steps,
    'conic gradient': conic_gradient,
    'single linear gradient': single_linear_gradient,
    'single radial gradient': single_radial_gradient,
  }
})

const Wrapper = Component.grid.article()
const Cell = Component.flex.ai_center.jc_center.div()
const Letter = Component.fs8.absolute.span()
const Controls =
  Component.f_invert100.bg_white.b_rad50.w200.absolute.t10.l10.div()
