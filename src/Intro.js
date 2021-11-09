import { Fragment, useState, useEffect } from 'react'
import { Component } from './utils/flags'
import { random } from './utils/toolbox'
import { Upsize, Tags, Arrow } from './icons'

export const Intro = () => {
  const [display_about, set_display_about] = useState(false)

  return (
    <Fragment>
      <Presentation>
        Kikoo Playground — A set of interactive blocks to draw, play, write,
        animate...
        {instructions.map((instruction, index) => (
          <Instruction key={index} instruction={instruction} />
        ))}
        <Menu onClick={() => set_display_about(!display_about)}>
          {display_about ? '×' : 'i'}
        </Menu>
      </Presentation>
      <About display_about={display_about} />
    </Fragment>
  )
}

const Instruction = ({ instruction }) => {
  const { name, icon, text } = instruction
  const upsize = name === 'upsize'
  const tags = name === 'tags'
  const Icon = icon

  return (
    <Line mt20={upsize} mt5={tags}>
      <Icon
        ba
        bw2
        mr15
        width={30}
        stroke="black"
        stroke_width={tags ? 13 : 15}
        style={{ marginBottom: '-5px', padding: upsize ? '6px' : '4.5px' }}
      />
      {text}
    </Line>
  )
}

const About = ({ display_about }) => {
  const [wrapper, set_wrapper] = useState(null)

  useEffect(() => {
    document.body.style.overflow = display_about ? 'hidden' : 'auto'
  }, [display_about])

  if (!display_about) return null

  return (
    <Modal>
      <Name>Marie Malarme</Name>
      <Link href="https://marie.studiodev.xyz/" target="_blank">
        <Arrow width={30} stroke="black" stroke_width={10} mr15 />
        www.marie.studiodev.xyz
      </Link>
      <Interests elemRef={set_wrapper}>
        {tags.map((tag, index) => (
          <Tag key={tag} tag={tag} index={index} wrapper={wrapper} />
        ))}
      </Interests>
    </Modal>
  )
}

const Tag = ({ tag, index, wrapper }) => {
  const [{ top, left }, set_coords] = useState({ top: 0, left: 0 })
  const [is_down, set_is_down] = useState(false)
  const [element, set_element] = useState(null)

  useEffect(() => {
    if (!wrapper) return
    const { width, height } = wrapper.getBoundingClientRect()
    set_coords({ top: random(0, height - 50), left: random(0, width - 250) })
  }, [wrapper])

  const set_mouse_offset = (event) => {
    const { left, top } = element.getBoundingClientRect()
    set_is_down({ x: event.pageX - left, y: event.pageY - top })
  }

  const update_coords = (event) => {
    if (!is_down) return
    set_coords({
      top: event.pageY - wrapper.offsetTop - is_down.y,
      left: event.pageX - wrapper.offsetLeft - is_down.x,
    })
  }

  return (
    <Interest
      className="tag"
      zi1={index < 2}
      white={index < 2}
      bg_black={index < 2}
      style={{ top, left }}
      elemRef={set_element}
      onMouseMove={update_coords}
      onMouseDown={set_mouse_offset}
      onMouseUp={() => set_is_down(false)}
      onMouseLeave={() => set_is_down(false)}
    >
      {tag}
    </Interest>
  )
}

const tags = [
  'graphic designer',
  'web programmer',
  'art',
  'design',
  'web',
  'javascript',
  'creative coding',
  'react',
  'css',
  'arduino',
  'interaction',
  'inputs',
  'colors',
  '3d printing',
  'dataviz',
  'ux ui',
]

const instructions = [
  {
    name: 'upsize',
    icon: Upsize,
    text: 'Enter & exit full screen mode for a block',
  },
  {
    name: 'tags',
    icon: Tags,
    text: 'Show & hide the source code of a block',
  },
]

const Presentation =
  Component.bw2.b_grey8.bb.lh33.w100vw.pl50.pr100.pv45.sans.fs30.div()
const Line = Component.p()
const Menu =
  Component.absolute.zi20.mono.fs24.c_pointer.r40.t40.w35.h35.ba.b_rad50p.bw2.flex.ai_center.jc_center.div()
const Modal =
  Component.ai_flex_start.flex.flex_column.ph80.pv70.w100vw.h100vh.zi15.fixed.t0.l0.bg_white.div()
const Name = Component.b_rad50.bw2.bg_black.white.bt.fs50.ph35.pv20.div()
const Link = Component.ol_none.text_dec_none.black.bb.bw2.mt35.fs40.flex.a()
const Interests = Component.relative.flex1.w100p.mt30.div()
const Interest =
  Component.no_select.ws_nowrap.c_move.b_rad50.pv20.ph35.fs40.absolute.ba.bw2.bg_white.div()
