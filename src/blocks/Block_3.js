import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_3 = (props) => {
  const [tiles, set_tiles] = useState(5)

  return (
    <Wrapper
      style={{
        backgroundImage: `linear-gradient(
        45deg,
        hotpink 0%,
        hotpink 50%,
        lime 50%,
        lime 100%)`,
        backgroundSize: `calc(25vw / ${tiles}) calc(25vw / ${tiles})`,
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

const Wrapper = Component.flex.pa30.ai_center.jc_center.fs50.no_select.section()
const Button =
  Component.w30.h30.ba.bw3.fs30.b_rad50p.flex.ai_center.jc_center.c_pointer.div()
const Tiles = Component.w150.text_center.div()
