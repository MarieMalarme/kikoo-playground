import { useState } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'
import stone_image from '../images/stone.jpg'
import stone_hit_1_image from '../images/stone-hit-1.jpg'
import stone_hit_2_image from '../images/stone-hit-2.jpg'
import stone_hit_3_image from '../images/stone-hit-3.jpg'
import hammer_image from '../images/hammer.png'

export const Block_29 = ({ is_selected, color }) => {
  const [has_clicked, set_has_clicked] = useState(false)
  const [broken_stones, set_broken_stones] = useState(0)

  return (
    <Wrapper
      tabIndex="0"
      id="cursor-hammer"
      onClick={() => set_has_clicked(true)}
    >
      {!has_clicked && (
        <Instruction bg_cherry4>
          Take the wall down! Click 4 times on each brick to break it.
        </Instruction>
      )}
      {broken_stones === columns * rows && (
        <Instruction bg_grey4>Well done, you nailed it!</Instruction>
      )}
      <Grid
        style={{
          gridGap: '7px',
          cursor: `url(${hammer_image}), auto`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {stones.map((stone, index) => (
          <Stone
            key={index}
            stone={stone}
            broken_stones={broken_stones}
            set_broken_stones={set_broken_stones}
          />
        ))}
      </Grid>
    </Wrapper>
  )
}

const Stone = ({ stone, broken_stones, set_broken_stones }) => {
  const [hits, set_hits] = useState(0)
  const { rotation, scale_x, scale_y } = stone
  const is_broken = hits === 4
  const background = is_broken ? '' : `center / cover url(${images[hits]})`

  return (
    <Cell
      bg_cherry3={is_broken}
      className={hits < 4 ? 'hover_shadow_cherry4' : ''}
      onClick={() => {
        if (!is_broken) set_hits(hits + 1)
        if (hits === max_hits - 1) set_broken_stones(broken_stones + 1)
      }}
      style={{
        background,
        transform: `rotate(${rotation}deg) scaleX(${scale_x}) scaleY(${scale_y})`,
      }}
    />
  )
}

const columns = 4
const rows = 6
const max_hits = 4

const scales = [-1, 1]
const stones = [...Array(columns * rows).keys()].map(() => ({
  scale_x: scales[random(0, 1)],
  scale_y: scales[random(0, 1)],
  rotation: random(0, 1) * 180,
}))

const images = [
  stone_image,
  stone_hit_1_image,
  stone_hit_2_image,
  stone_hit_3_image,
]

const Wrapper = Component.flex.ai_center.jc_center.article()
const Grid = Component.w100p.h100p.grid.ba.bg_grey4.b_grey4.bw3.pa5.div()
const Cell = Component.b_rad6.w100p.h100p.div()
const Instruction =
  Component.zi1.white.fs16.flex.ai_center.jc_center.pa30.events_none.w160.h160.b_rad50p.text_center.absolute.span()
