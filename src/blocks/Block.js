import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { Tags, Downsize, Upsize } from '../icons'

export const Block = ({ block, index, ...states }) => {
  const [display_code, set_display_code] = useState(false)
  const [hovered, set_hovered] = useState(false)

  const { component, color } = block
  const Component = component

  const { selected_block, set_selected_block } = states
  const { scroll_top, set_scroll_top } = states
  const is_selected = selected_block === index + 1

  const fullscreen = {
    enter: () => {
      set_scroll_top(window.pageYOffset)
      set_selected_block(index + 1)
      set_hovered(true)
    },
    exit: async () => {
      await set_selected_block(null)
      set_hovered(false)
      window.scrollTo(0, scroll_top)
    },
  }

  return (
    <Section
      name={index + 1}
      flex={is_selected}
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
          <DisplayCode
            display_code={display_code}
            set_display_code={set_display_code}
            is_selected={is_selected}
            fullscreen={fullscreen}
          />
          <Fullscreen
            index={index}
            is_selected={is_selected}
            fullscreen={fullscreen}
          />
        </Header>
      )}

      {display_code && is_selected && <SourceCode index={index} />}
    </Section>
  )
}

const DisplayCode = (props) => {
  const { display_code, set_display_code, is_selected, fullscreen } = props

  const toggle_display_code = () => {
    if (!is_selected) {
      set_display_code(true)
      fullscreen.enter()
    } else {
      set_display_code(!display_code)
    }
  }

  return (
    <Toggle onClick={toggle_display_code}>
      <Tags width={19} stroke_width={8} />
    </Toggle>
  )
}

const Fullscreen = ({ index, is_selected, fullscreen }) => {
  const Icon = is_selected ? Downsize : Upsize

  return (
    <Toggle onClick={is_selected ? fullscreen.exit : fullscreen.enter}>
      <Icon width={13} stroke_width={10} stroke="var(--grey6)" />
    </Toggle>
  )
}

const SourceCode = ({ index }) => {
  const [source_code, set_source_code] = useState()
  const source_code_url = `${github_url}/Block_${index + 1}.js`

  useEffect(() => {
    const fetch_source_code = async () => {
      const response = await fetch(source_code_url)
      const text = await response.text()
      set_source_code(text)
    }

    fetch_source_code()
  }, [source_code_url])

  return <Code>{source_code}</Code>
}

const github_url =
  'https://raw.githubusercontent.com/MarieMalarme/kikoo-playground/master/src/blocks/'

const Section = Component.section()
const Header = Component.flex.zi10.absolute.r10.t10.header()
const Toggle =
  Component.ol_none.flex.ai_center.jc_center.shadow_a_s.c_pointer.bg_white.ml10.w25.h25.ba0.b_rad5.button()
const Code = Component.mono.fs14.of_scroll.ws_pre.pv30.ph35.code()
