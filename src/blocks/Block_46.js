import { useState, useEffect } from 'react'
import { Component, Div } from '../utils/flags'
import { Select } from '../utils/components'
import { random } from '../utils/toolbox'

export const Block_46 = ({ color }) => {
  const [mode, set_mode] = useState('emojis')
  const [is_random, set_is_random] = useState(true)
  const [mouse, set_mouse] = useState({ x: 100, y: 100 })
  const [wrapper, set_wrapper] = useState(null)

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    // translate the mouse position in the page to the coordinate system of the block
    const translator_x = wrapper.offsetParent.offsetLeft
    const translator_y = wrapper.offsetParent.offsetTop
    const x = event.pageX - translator_x
    const y = event.pageY - translator_y

    set_mouse({ x, y })
  }

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
    const { width, height } = wrapper.getBoundingClientRect()
    set_mouse({ x: width / 2, y: height / 2 })
  }, [wrapper])

  const { max_inc } = modes[mode]
  const max = wrapper?.getBoundingClientRect().width / columns + max_inc
  const { min } = modes[mode]

  return (
    <Wrapper
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
      elemRef={set_wrapper}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        background: 'dodgerblue',
      }}
    >
      {items.map((index) => (
        <Item
          min={min}
          max={max}
          key={index}
          mode={mode}
          index={index}
          color={color}
          mouse={mouse}
          is_random={is_random}
        />
      ))}

      <Controls>
        <Select
          ba0
          bg_white
          value={mode}
          set_value={set_mode}
          list={Object.keys(modes)}
        />

        <SwitchWrapper
          o40={mode === 'dots'}
          c_pointer={mode !== 'dots'}
          onClick={() => mode !== 'dots' && set_is_random(!is_random)}
        >
          <Switch jc_flex_end={is_random}>
            <SwitchDot />
          </Switch>
          <Div o50={!is_random}>Random mode</Div>
        </SwitchWrapper>
      </Controls>
    </Wrapper>
  )
}

const Item = ({ mode, is_random, color, mouse, min, max, index }) => {
  const [elem, set_elem] = useState(null)

  // calculate the distances between the item and the mouse
  const distance_from_mouse_x = elem?.offsetLeft - mouse.x
  const distance_from_mouse_y = elem?.offsetTop - mouse.y
  const distance_x_squared = Math.pow(distance_from_mouse_x, 2)
  const distance_y_squared = Math.pow(distance_from_mouse_y, 2)
  const distance_from_mouse = Math.sqrt(distance_x_squared + distance_y_squared)

  // check if the item is in the mouse range to calculate its properties values
  const is_in_range = distance_from_mouse < range_size

  const Node = () => {
    if (mode === 'ascii') {
      let character

      if (is_random) {
        character = random_ascii_characters[index]
      } else {
        // calculate character's index
        const crossed_value =
          (ascii_characters.length * distance_from_mouse) / range_size // cross-multiplication to get the proportional value
        const character_index = Math.floor(crossed_value)
        character = is_in_range ? ascii_characters.at(character_index) : '•'
      }

      return <Character mono>{character}</Character>
    }

    if (mode === 'emojis') {
      let character

      if (is_random) {
        character = random_emojis[index]
      } else {
        // calculate character's index
        const crossed_value = (emojis.length * distance_from_mouse) / range_size // cross-multiplication to get the proportional value
        const character_index = Math.floor(crossed_value)
        character = is_in_range ? emojis.at(character_index) : '⭐️'
      }

      return <Character>{character}</Character>
    }

    if (mode === 'letters') {
      const character = is_random ? random_characters[index] : 'a'
      return <Character>{character}</Character>
    }

    if (mode === 'dots') {
      // calculate dot size
      const crossed_value = (max * distance_from_mouse) / range_size // cross-multiplication to get the proportional value
      const translated_value = max - (crossed_value - min) // translate the value in the range with min & max values
      const dot_size = is_in_range ? Math.floor(translated_value) : min

      return (
        <Dot
          style={{
            width: `${dot_size}px`,
            height: `${dot_size}px`,
            background: 'gold',
          }}
        />
      )
    }
  }

  // calculate font size
  const fs_crossed_value = (max * distance_from_mouse) / range_size // cross-multiplication to get the proportional value
  const fs_translated_value = max - (fs_crossed_value - min) // translate the value in the range with min & max values
  const font_size = is_in_range ? Math.floor(fs_translated_value) : min

  return (
    <Cell
      elemRef={set_elem}
      style={{ fontSize: `${font_size}px`, color: 'gold' }}
    >
      <Node />
    </Cell>
  )
}

const modes = {
  emojis: { min: 3, max_inc: 2 },
  ascii: { min: 7, max_inc: 5 },
  letters: { min: 6, max_inc: 4 },
  dots: { min: 2, max_inc: -2 },
}

const rows = 25
const columns = rows * 2
const items_amount = rows * columns
const items = [...Array(items_amount).keys()]
const range_size = 100

const random_characters = items.map(() =>
  String.fromCharCode(0 | (Math.random() * 52 + 65)),
)

const ascii_characters = ['•', '✹', '¤', '▒', '░', '▓'].reverse()
const random_ascii_characters = items.map(
  () => ascii_characters[random(0, ascii_characters.length - 1)],
)

const emojis = ['🌞', '⭐️', '💛', '🟡', '📀', '🌼']
const random_emojis = items.map(() => emojis[random(0, emojis.length - 1)])

const Wrapper = Component.grid.article()
const Cell = Component.w100p.h100p.flex.ai_center.jc_center.div()
const Character = Component.absolute.div()
const Dot = Component.absolute.w5.h5.b_rad50p.div()
const Controls = Component.b_rad5.t20.l20.absolute.div()
const SwitchWrapper =
  Component.pl10.pr15.h35.bg_white.b_rad20.mt10.fs14.flex.ai_center.div()
const Switch =
  Component.ba.bg_white.mr10.w27.h15.b_black.b_rad50.flex.ai_center.ph3.div()
const SwitchDot = Component.w7.h7.bg_black.b_rad50p.div()
