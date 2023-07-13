import { useState } from 'react'
import { Component } from '../utils/flags'
import { shape_10 as pixels_grid } from './pixels_grids'

export const Block_83 = ({ is_selected }) => {
  const [columns, set_columns] = useState(4)
  const grids = [...Array(columns * columns).keys()]

  return (
    <Wrapper style={{ background: 'saddlebrown' }}>
      <Grid>
        {grids.map((grid_index) => (
          <Cells
            key={grid_index}
            style={{
              width: `calc(100% / ${columns})`,
              height: `calc(100% / ${columns})`,
              fontSize: `${(is_selected ? 60 : 25) / columns}px`,
            }}
          >
            {pixels_grid.map((row, row_index) =>
              row.map((cell, cell_index) => (
                <Cell
                  key={cell_index}
                  style={{
                    color: 'cyan',
                    width: `calc(100% / ${row.length})`,
                    height: `calc(100% / ${row.length})`,
                    background:
                      cell && cell_index % 2 ? 'lightgoldenrodyellow' : '',
                  }}
                >
                  {cell && !(cell_index % 2)
                    ? characters[
                        Math.abs(
                          cell_index + row_index + Math.floor(row.length / 2),
                        ) % 5
                      ]
                    : ''}
                </Cell>
              )),
            )}
          </Cells>
        ))}
      </Grid>
      <Input
        min={1}
        max={8}
        type="range"
        defaultValue={columns}
        style={{
          bottom: is_selected ? 70 : 20,
          transform: is_selected ? '' : 'scale(0.5)',
        }}
        onInput={(event) => set_columns(Number(event.target.value))}
      />
    </Wrapper>
  )
}

const characters = ['-', '⊡', '✴', '!', '✧']

const cells_0 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const Wrapper = Component.flex.ai_center.jc_center.article()
const Grid = Component.ph20.pv30.w100p.h100p.flex.flex_wrap.div()
const Cells = Component.flex.flex_wrap.div()
const Cell = Component.mono.flex.ai_center.jc_center.div()
const Input = Component.absolute.w65p.max_w300.input()
