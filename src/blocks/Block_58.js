import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_58 = ({ is_hovered }) => {
  const [shapes, set_shapes] = useState(generate_random_shapes)
  const [wrapper, set_wrapper] = useState(null)

  useEffect(() => {
    const { matches } = window.matchMedia('(max-width: 600px)')
    if (!wrapper || !is_hovered || matches) return
    wrapper.focus()
  }, [wrapper, is_hovered])

  const handle_keydown = (event) => {
    if (!is_hovered || event.key !== 'Enter') return
    set_shapes(generate_random_shapes)
  }

  return (
    <Wrapper
      elemRef={set_wrapper}
      tabIndex="0"
      style={{ background: 'deepskyblue' }}
      onKeyDown={handle_keydown}
      onClick={() => set_shapes(generate_random_shapes)}
    >
      {shapes.map(({ component, color }, index) => {
        const Shape = component
        return <Shape key={index} color={color} />
      })}

      <Instruction none__xs>Press Enter to generate a new totem</Instruction>
      <Instruction none__d>Tap to generate a new totem</Instruction>
    </Wrapper>
  )
}

const Rectangle_1 = ({ color }) => (
  <Svg
    width={580 / 10}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 580 190"
  >
    <rect width="580" height="190" rx={30} fill={color} />
  </Svg>
)

const Rectangle_2 = ({ color }) => (
  <Svg
    width={1000 / 10}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 180"
  >
    <rect width="1000" height="180" rx="90" fill={color} />
  </Svg>
)

const Rectangle_3 = ({ color }) => (
  <Svg
    width={250 / 10}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 250 355"
  >
    <rect width="250" height="355" rx={30} fill={color} />
  </Svg>
)

const Rectangle_4 = ({ color }) => (
  <Svg
    width={250 / 10}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 250 710"
  >
    <rect width="250" height="710" rx={30} fill={color} />
  </Svg>
)

const Circle_1 = ({ color }) => (
  <Svg
    width={450 / 10}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 450 450"
  >
    <circle cx={225} cy={225} r={225} fill={color} />
  </Svg>
)

const Circle_2 = ({ color }) => (
  <Svg
    width={665 / 10}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 665 665"
  >
    <circle cx={332.5} cy={332.5} r={332.5} fill={color} />
  </Svg>
)

const bases_components = [Rectangle_1, Rectangle_2]
const shapes_components = [
  Rectangle_1,
  Rectangle_1,
  Rectangle_2,
  Rectangle_2,
  Rectangle_2,
  Rectangle_3,
  Rectangle_3,
  Rectangle_3,
  Rectangle_4,
  Circle_1,
  Circle_1,
  Circle_1,
  Circle_2,
]

const generate_random_shape = (index) => {
  const is_last = index === shapes_amount

  const color = index % 2 ? colors[0] : colors[1]
  const base = bases_components[random(0, bases_components.length - 1)]
  const body = shapes_components[random(0, shapes_components.length - 1)]
  const component = is_last ? base : body

  return { color, component }
}

const generate_random_shapes = () => shapes_array.map(generate_random_shape)

const colors = ['white', 'peru']
const shapes_amount = 5
const shapes_array = [...Array(shapes_amount + 1).keys()]

const Wrapper = Component.flex.flex_column.ai_center.jc_center.article()
const Svg = Component.of_visible.svg()
const Instruction = Component.absolute.w100p.text_center.b20.fs14.div()
