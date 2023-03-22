import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { Tags, Downsize, Upsize } from '../icons'

export const Block = ({ block, index, ...states }) => {
  const [display_code, set_display_code] = useState(false)

  const { component, color } = block
  const Component = component

  const { selected_block, set_selected_block } = states
  const { hovered_block, set_hovered_block } = states
  const { scroll_top, set_scroll_top } = states

  const id = index + 1
  const is_selected = selected_block === id
  const is_hovered = hovered_block === id

  const fullscreen = {
    enter: (id) => {
      set_scroll_top(window.pageYOffset)
      set_selected_block(id)
      set_hovered_block(id)
    },
    exit: async (id) => {
      await set_selected_block(null)
      window.scrollTo(0, scroll_top)
      set_display_code(false)
    },
  }

  return (
    <Section
      id={`section-${id}`}
      name={id}
      flex={is_selected}
      w100vw={is_selected}
      h100vh={is_selected}
      none={selected_block && !is_selected}
      onMouseOver={() => set_hovered_block(id)}
      onMouseEnter={() => set_hovered_block(id)}
      onTouchMove={() => set_hovered_block(id)}
      onTouchStart={() => set_hovered_block(id)}
      style={{ '--color-block': color.value }}
    >
      <Component
        id={id}
        color={color}
        is_selected={is_selected}
        is_hovered={is_hovered}
      />

      <Header>
        <DisplayCode
          display_code={display_code}
          set_display_code={set_display_code}
        />
        <Fullscreen id={id} is_selected={is_selected} fullscreen={fullscreen} />
      </Header>

      {display_code && <SourceCode id={id} is_selected={is_selected} />}
    </Section>
  )
}

const DisplayCode = ({ display_code, set_display_code }) => (
  <Toggle onClick={() => set_display_code(!display_code)}>
    <Tags width={20} stroke_width={9} stroke="black" />
  </Toggle>
)

const Fullscreen = ({ id, is_selected, fullscreen }) => {
  const Icon = is_selected ? Downsize : Upsize

  return (
    <Toggle
      none__xs
      onClick={() => (is_selected ? fullscreen.exit(id) : fullscreen.enter(id))}
    >
      <Icon width={14} stroke_width={12} stroke="black" />
    </Toggle>
  )
}

const SourceCode = ({ id, is_selected }) => {
  const [source_code, set_source_code] = useState('Loading source code...')
  const source_code_url = `${github_url}/Block_${id}.js`

  useEffect(() => {
    const fetch_source_code = async () => {
      const response = await fetch(source_code_url)
      const code = await response.text()
      const { status } = response
      set_source_code(status === 200 ? code : error(status))
    }

    fetch_source_code()
  }, [source_code_url])

  return (
    <Code
      t0={!is_selected}
      l0={!is_selected}
      w100p={!is_selected}
      h100p={!is_selected}
      min_w500={is_selected}
      absolute={!is_selected}
      min_w100vw__s={is_selected}
    >
      <Title>>>> Block_{id}.js</Title>
      {source_code}
    </Code>
  )
}

const error = (status) =>
  `The code could not be loaded!\nAn error ${status} was encountered.`

const github_url =
  'https://raw.githubusercontent.com/MarieMalarme/kikoo-playground/master/src/blocks/'

const Section = Component.section()
const Header = Component.zi10.absolute.r10.t10.header()
const Toggle =
  Component.ol_none.flex.ai_center.jc_center.c_pointer.bg_white.ml10.w30.h30.ba.bw2.button()
const Code =
  Component.relative.zi5.br.bb.b_grey2.bg_white.mono.fs14.of_scroll.ws_pre.pt80.pb30.ph35.lh22.w100p__s.h100p__s.absolute__s.t0__s.l0__s.code()
const Title = Component.fs14.grey4.b_grey3.pb10.absolute.t30.l0.mh35.w85p.p()
