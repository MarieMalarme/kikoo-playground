import { useState } from 'react'
import { Component } from '../utils/flags'
import { shape_1 as pixels_grid } from './pixels_grids'

export const Block_84 = ({ is_hovered }) => {
  const [inc, set_inc] = useState(0)
  const [colors, set_colors] = useState({
    background: '#ffb3b3',
    number: '#8affe8',
  })

  return (
    <Wrapper style={{ background: colors.background }}>
      {pixels_grid.map((row, row_index) =>
        row.map((cell, cell_index) => (
          <Cell
            key={cell_index}
            style={{
              width: `calc(100% / ${row.length})`,
              height: `calc(100% / ${row.length})`,
              background: cell
                ? `conic-gradient(from ${inc * 2}deg, ${colors.number} ${
                    100 -
                    ((((cell_index + 1 + (row_index + 1)) * 2.5 + inc) % 95) +
                      5)
                  }%, transparent ${
                    100 -
                    ((((cell_index + 1 + (row_index + 1)) * 2.5 + inc) % 95) +
                      5)
                  }%)`
                : `conic-gradient(from ${inc * 2}deg, ${colors.number} ${
                    (((cell_index + 1 + (row_index + 1)) * 2.5 + inc) % 95) + 5
                  }%, transparent ${
                    (((cell_index + 1 + (row_index + 1)) * 2.5 + inc) % 95) + 5
                  }%)`,
            }}
          ></Cell>
        )),
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

      <ColorsInputs>
        <input
          type="color"
          value={colors.background}
          onInput={(event) =>
            set_colors({ ...colors, background: event.target.value })
          }
        />
        <input
          type="color"
          value={colors.number}
          onInput={(event) =>
            set_colors({ ...colors, number: event.target.value })
          }
        />
      </ColorsInputs>
    </Wrapper>
  )
}

const Wrapper = Component.flex.flex_wrap.jc_center.article()
const Cell = Component.mono.flex.ai_center.jc_center.div()
const Input = Component.mb5.absolute.b30.w40p.input()
const ColorsInputs = Component.absolute.w65.flex.jc_between.div()
