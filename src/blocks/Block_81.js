import { useState } from 'react'
import { Component } from '../utils/flags'
import { shape_3 as pixels_grid } from './pixels_grids'

export const Block_81 = ({ is_hovered }) => {
  const [inc, set_inc] = useState(40)

  return (
    <Wrapper>
      {pixels_grid.map((row, row_index) =>
        row.map((cell, cell_index) => (
          <Cell
            key={cell_index}
            style={{
              width: `calc(100% / ${row.length})`,
              height: `calc(100% / ${row.length})`,
              background: `linear-gradient(to ${
                cell ? 'top' : 'bottom'
              }, indigo, orange ${(cell ? inc : 139 - inc) % 100}%)`,
            }}
          ></Cell>
        )),
      )}

      <Input
        min={40}
        max={99}
        type="range"
        defaultValue={inc}
        style={{ transform: 'scale(0.75)' }}
        onInput={(event) => set_inc(Number(event.target.value))}
      />
    </Wrapper>
  )
}

const Wrapper = Component.flex.flex_wrap.jc_center.article()
const Cell = Component.mono.flex.ai_center.jc_center.div()
const Input = Component.absolute.w250.b10.input()
