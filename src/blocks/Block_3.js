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
      <Button onClick={() => tiles > 1 && set_tiles(tiles - 1)}>-</Button>
      <Tiles>{tiles}</Tiles>
      <Button onClick={() => tiles < 10 && set_tiles(tiles + 1)}>+</Button>
    </Wrapper>
  )
}

const Wrapper = Component.flex.pa30.ai_center.jc_center.fs50.no_select.section()
const Button = Component.c_pointer.div()
const Tiles = Component.w150.text_center.div()
