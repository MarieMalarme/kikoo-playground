import { useState } from 'react'
import { Component } from '../utils/flags'
import { Code, Downsize, Upsize } from '../icons'

export const Block = ({ block, index, selected_block, ...states }) => {
  const [hovered, set_hovered] = useState(false)
  const is_selected = selected_block === index + 1

  const { component, color } = block
  const Component = component

  return (
    <Section
      name={index + 1}
      w100vw={is_selected}
      h100vh={is_selected}
      none={selected_block && !is_selected}
      onMouseOver={() => set_hovered(true)}
      onMouseEnter={() => set_hovered(true)}
      onMouseLeave={() => set_hovered(false)}
      style={{ '--color-block': color.value }}
    >
      <Component color={color} is_selected={is_selected} hovered={hovered} />
      {hovered && (
        <Header>
          <Toggle>
            <Code width={19} stroke_width={8} />
          </Toggle>
          <Fullscreen
            index={index}
            is_selected={is_selected}
            states={{ ...states, set_hovered }}
          />
        </Header>
      )}
    </Section>
  )
}

const Fullscreen = ({ index, is_selected, states }) => {
  const { set_selected_block, scroll_top, set_scroll_top, set_hovered } = states
  const Icon = is_selected ? Downsize : Upsize

  const enter = () => {
    set_scroll_top(window.pageYOffset)
    set_selected_block(index + 1)
    set_hovered(true)
  }

  const exit = async () => {
    await set_selected_block(null)
    set_hovered(false)
    window.scrollTo(0, scroll_top)
  }

  return (
    <Toggle onClick={is_selected ? exit : enter}>
      <Icon width={13} stroke_width={10} stroke="var(--grey6)" />
    </Toggle>
  )
}

const Section = Component.section()
const Header = Component.flex.zi10.absolute.r10.t10.header()
const Toggle =
  Component.outline_none.ai_center.flex.jc_center.shadow_a_s.c_pointer.bg_white.ml10.w25.h25.ba0.b_rad5.button()
