import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { get_invert_color } from '../utils/toolbox'

export const Block_3 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [tile_size, set_tile_size] = useState(null)
  const [tiles, set_tiles] = useState(5)

  useEffect(() => {
    if (!wrapper) return
    const { width } = wrapper.getBoundingClientRect()
    set_tile_size(Math.ceil(width / tiles))
  }, [wrapper, tiles])

  const color2 = get_invert_color(color)

  return (
    <Wrapper
      elemRef={set_wrapper}
      style={{
        backgroundSize: `${tile_size}px ${tile_size}px`,
        backgroundImage: `linear-gradient(
        45deg,
        ${color.value} 0%,
        ${color.value} 50%,
        ${color2} 50%,
        ${color2} 100%)`,
      }}
    >
      <Button onClick={() => tiles > 1 && set_tiles(tiles - 1)}>
        <Icon minus />
      </Button>
      <Tiles>{tiles}</Tiles>
      <Button onClick={() => tiles < 10 && set_tiles(tiles + 1)}>
        <Icon plus />
      </Button>
    </Wrapper>
  )
}

const Icon = ({ plus, minus }) => (
  <svg
    width="70%"
    height="70%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 130 130"
  >
    <path
      fill="none"
      stroke="black"
      strokeWidth={22}
      d={(plus && 'M65 15v100M115 65H15') || (minus && 'M115 65H15')}
    />
  </svg>
)

const Wrapper = Component.flex.pa30.ai_center.jc_center.fs50.no_select.article()
const Button =
  Component.w30.h30.ba.bw3.fs30.b_rad50p.flex.ai_center.jc_center.c_pointer.div()
const Tiles = Component.w150.text_center.div()
