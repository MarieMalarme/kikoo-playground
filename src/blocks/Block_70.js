import { useState } from 'react'
import { Component } from '../utils/flags'
import { shape_5 as pixels_grid } from './pixels_grids'

export const Block_70 = ({ is_hovered }) => {
  const [inc, set_inc] = useState(50)

  return (
    <Wrapper
      onMouseMove={() => set_inc(inc + 1)}
      onTouchMove={() => set_inc(inc + 1)}
    >
      {pixels_grid.map((row, row_index) =>
        row.map((cell, cell_index) => (
          <Cell
            key={cell_index}
            style={{
              background: `conic-gradient(from ${
                cell ? -(inc / 2) : inc
              }deg, crimson, cyan)`,
              width: `calc(100% / ${row.length})`,
              height: `calc(100% / ${row.length})`,
            }}
          ></Cell>
        )),
      )}
    </Wrapper>
  )
}

const Wrapper = Component.flex.flex_wrap.article()
const Cell = Component.mono.flex.ai_center.jc_center.div()
