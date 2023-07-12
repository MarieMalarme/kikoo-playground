import { useState } from 'react'
import { Component } from '../utils/flags'
import { shape_6 as pixels_grid } from './pixels_grids.js'

export const Block_79 = ({ is_hovered }) => {
  const [inc, set_inc] = useState(50)
  const [up, set_up] = useState(true)

  const update_inc = () => {
    if (inc === 50) {
      set_inc(49.5)
      set_up(false)
      return
    } else if (inc === min) {
      set_inc(min + 0.5)
      set_up(true)
      return
    }

    set_inc(up ? inc + 0.5 : inc - 0.5)
  }

  return (
    <Wrapper
      style={{ background: 'darkslategray' }}
      onMouseMove={update_inc}
      onTouchMove={update_inc}
    >
      {pixels_grid.map((row, row_index) =>
        row.map((cell, cell_index) => (
          <Cell
            key={cell_index}
            style={{
              background: cell
                ? `radial-gradient(red, aquamarine ${
                    inc % 50 === min ? min : inc % 50
                  }%, transparent ${inc % 50 || 50 + min}%)`
                : `radial-gradient(red, aquamarine ${
                    inc % 50 ? 50 + min - (inc % 50) : min
                  }%, transparent ${inc % 50 ? 50 + min - (inc % 50) : min}%)`,
              width: `calc(100% / ${row.length})`,
              height: `calc(100% / ${row.length})`,
            }}
          ></Cell>
        )),
      )}
    </Wrapper>
  )
}

const min = 10

const Wrapper = Component.flex.flex_wrap.article()
const Cell = Component.mono.flex.ai_center.jc_center.div()
