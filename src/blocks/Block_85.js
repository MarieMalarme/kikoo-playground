import { useState } from 'react'
import { Component } from '../utils/flags'
import { shape_4 as pixels_grid } from './pixels_grids'

export const Block_85 = ({ is_hovered }) => {
  const [inc, set_inc] = useState(50)
  const [tiles_amount, set_tiles_amount] = useState(1)
  const [colors, set_colors] = useState({
    background: 'mediumslateblue',
    number: '#1aff00',
  })

  return (
    <Wrapper style={{ background: colors.background }}>
      {pixels_grid.map((row, row_index) =>
        row.map((cell, cell_index) => (
          <Cell
            key={cell_index}
            style={{
              backgroundSize: `${100 / tiles_amount}% ${100 / tiles_amount}%`,
              width: `calc(100% / ${row.length})`,
              height: `calc(100% / ${row.length})`,
              backgroundImage: cell
                ? `linear-gradient(-${inc}deg, ${colors.number}, transparent)`
                : `linear-gradient(${inc}deg, ${colors.number}, transparent)`,
            }}
          ></Cell>
        )),
      )}

      <Input
        l10
        min={0}
        max={360}
        type="range"
        defaultValue={inc}
        style={{ transform: 'scale(0.8)' }}
        onInput={(event) => set_inc(Number(event.target.value))}
      />

      <Input
        r10
        min={1}
        max={4}
        type="range"
        defaultValue={tiles_amount}
        style={{ transform: 'scale(0.8)' }}
        onInput={(event) => set_tiles_amount(Number(event.target.value))}
      />
    </Wrapper>
  )
}

const Wrapper = Component.flex.flex_wrap.article()
const Cell = Component.mono.flex.ai_center.jc_center.div()
const Input = Component.mb5.absolute.b10.w150.input()
