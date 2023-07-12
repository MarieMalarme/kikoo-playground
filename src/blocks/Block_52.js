import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { get_invert_color } from '../utils/toolbox'

export const Block_52 = ({ color, is_selected }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [selected_characters, set_selected_characters] = useState('╬░▒▓▒░╬')
  const [mouse, set_mouse] = useState({ x: 100, y: 100 })

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const { width, height } = wrapper.getBoundingClientRect()
    // translate the mouse position in the page to the coordinate system of the block
    const translator_x = width / 2 + wrapper.offsetParent.offsetLeft
    const translator_y = height / 2 + wrapper.offsetParent.offsetTop
    const x = event.pageX - translator_x
    const y = event.pageY - translator_y

    set_mouse({ x, y })
  }

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  const inverted_color = get_invert_color(color)

  return (
    <Wrapper
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
      elemRef={set_wrapper}
    >
      <Text
        fs18={!is_selected}
        fs30={is_selected}
        style={{
          color: inverted_color,
          lineHeight: '14px',
          textShadow: `
          ${inverted_color} ${mouse.x / 4}px ${mouse.y / 4}px,
          ${inverted_color} ${-mouse.x / 4}px ${-mouse.y / 4}px,

          ${inverted_color} ${-mouse.x / 4}px ${mouse.y / 4}px,
          ${inverted_color} ${mouse.x / 4}px ${-mouse.y / 4}px,

          ${inverted_color} ${-mouse.x / 2}px ${-mouse.y / 2}px,
          ${inverted_color} ${mouse.x / 2}px ${mouse.y / 2}px,

          ${inverted_color} ${mouse.x / 2}px ${-mouse.y / 2}px,
          ${inverted_color} ${-mouse.x / 2}px ${mouse.y / 2}px,

          ${inverted_color} ${mouse.x / 1.33}px ${mouse.y / 1.33}px,
          ${inverted_color} ${-mouse.x / 1.33}px ${-mouse.y / 1.33}px,

          ${inverted_color} ${-mouse.x / 1.33}px ${mouse.y / 1.33}px,
          ${inverted_color} ${mouse.x / 1.33}px ${-mouse.y / 1.33}px
          `,
        }}
      >
        {selected_characters}
      </Text>

      <Characters b20={!is_selected} b70={is_selected}>
        {characters_modes.map(([name, characters], index) => (
          <Button
            key={name}
            mh20={index === 1}
            disabled={selected_characters === characters}
            c_pointer={selected_characters !== characters}
            onClick={() => set_selected_characters(characters)}
          >
            {name}
          </Button>
        ))}
      </Characters>
    </Wrapper>
  )
}

const characters_modes = Object.entries({
  patterns: '╬░▒▓▒░╬',
  stars: '✷✧✳✧✷\n✧✷✳✷✧\n✷✧✳✧✷',
  squares: '⊠⊞⊡⊞⊠\n⊠⊞⊡⊞⊠\n⊠⊞⊡⊞⊠\n',
})

const Wrapper = Component.flex.ai_center.jc_center.article()
const Text = Component.ws_pre.absolute.mono.div()
const Characters = Component.absolute.div()
const Button = Component.ba0.fs15.ws_pre.ba.ph20.pv10.b_rad50.sans.button()
