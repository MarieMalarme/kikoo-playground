import { useState } from 'react'
import { Component } from '../utils/flags'
import { shape_2 as pixels_grid } from './pixels_grids.js'

export const Block_75 = ({ is_hovered }) => {
  const [inc, set_inc] = useState(0)

  return (
    <Wrapper style={{ background: '#fcbdf7' }}>
      {pixels_grid.map((row, row_index) =>
        row.map((cell, cell_index) => {
          const value =
            (((cell_index + 1 + (row_index + 1)) * 7 + inc) % 95) + 5
          const percentage = cell ? 50 : value

          return (
            <Cell
              key={cell_index}
              style={{
                width: `calc(100% / ${row.length})`,
                height: `calc(100% / ${row.length})`,
                background: `linear-gradient(-45deg, red ${percentage}%, transparent ${percentage}%)`,
              }}
            />
          )
        }),
      )}

      <Input
        min={0}
        max={500}
        type="range"
        defaultValue={inc}
        className="range-input-thin"
        style={{ transform: 'scale(2)' }}
        onInput={(event) => set_inc(Number(event.target.value))}
      />
    </Wrapper>
  )
}

const Wrapper = Component.flex.flex_wrap.jc_center.article()
const Cell = Component.mono.flex.ai_center.jc_center.div()
const Input = Component.f_invert100.mb5.absolute.b30.w40p.input()
