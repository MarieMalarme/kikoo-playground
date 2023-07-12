import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'
import { shape_8 as pixels_grid } from './pixels_grids.js'

export const Block_78 = ({ is_hovered }) => {
  const [inc, set_inc] = useState(10)

  useEffect(() => {
    if (!is_hovered) return
    clearTimeout(timeout_id)
    timeout_id = setTimeout(() => set_inc(inc + 5), 50)
  })

  return (
    <Wrapper style={{ background: 'lightskyblue' }}>
      {rows.map((row, row_index) =>
        row.map((cell, cell_index) => (
          <Cell
            key={cell_index}
            style={{
              background: cell
                ? `radial-gradient(deeppink, transparent ${
                    ((cell + inc) % 70) + 10
                  }%)`
                : ``,
              width: `calc(100% / ${row.length})`,
              height: `calc(100% / ${row.length})`,
            }}
          ></Cell>
        )),
      )}
    </Wrapper>
  )
}

const rows = pixels_grid.map((row) =>
  row.map((is_filled) => (is_filled ? random(20, 70) : 0)),
)
let timeout_id

const Wrapper = Component.flex.flex_wrap.article()
const Cell = Component.mono.flex.ai_center.jc_center.div()
