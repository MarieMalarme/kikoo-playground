import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { character_0, character_8 } from './pixels_grids'

export const Block_80 = ({ is_selected, is_hovered }) => {
  const [cells, set_cells] = useState(cells_8)
  const [count, set_count] = useState(1)

  useEffect(() => {
    if (!is_hovered) return

    clearTimeout(timeout_id)
    timeout_id = setTimeout(() => {
      if (
        cells.flat().every((cell) => !cell) ||
        cells.flat().filter((c) => c).length <= 14
      ) {
        set_cells(count % 2 ? cells_0 : cells_8)
        set_count(count + 1)
      } else {
        const next_cells = cells.map((row, row_index) =>
          row.map((cell, cell_index) => {
            let neighbors = 0

            // top left
            if (row_index > 0 && cell_index > 0) {
              neighbors += cells[row_index - 1][cell_index - 1]
            }

            // top
            if (row_index > 0) {
              neighbors += cells[row_index - 1][cell_index]
            }

            // top right
            if (row_index > 0 && cell_index < row.length - 1) {
              neighbors += cells[row_index - 1][cell_index + 1]
            }

            // left
            if (cell_index > 0) {
              neighbors += cells[row_index][cell_index - 1]
            }

            // right
            if (cell_index < row.length - 1) {
              neighbors += cells[row_index][cell_index + 1]
            }

            // bottom left
            if (row_index < cells.length - 1 && cell_index > 0) {
              neighbors += cells[row_index + 1][cell_index - 1]
            }

            // bottom
            if (row_index < cells.length - 1) {
              neighbors += cells[row_index + 1][cell_index]
            }

            // bottom right
            if (row_index < cells.length - 1 && cell_index < row.length - 1) {
              neighbors += cells[row_index + 1][cell_index + 1]
            }

            const cell_is_alive = cell

            return cell_is_alive
              ? Number(neighbors >= 2 && neighbors < 4)
              : Number(neighbors === 3)
          }),
        )

        if (cells.flat().join() === next_cells.flat().join()) {
          set_cells(count % 2 ? cells_0 : cells_8)
          set_count(count + 1)
        } else {
          set_cells(next_cells)
        }
      }
    }, 75)
  })

  return (
    <Wrapper style={{ background: 'darkorchid' }}>
      <Cells>
        {cells.map((row, row_index) =>
          row.map((cell, cell_index) => {
            const is_other_color = row_index % 3 && cell_index % 3
            const character = is_other_color ? '✺' : '☉'
            const background = cell && (is_other_color ? 'cyan' : 'gold')
            const color = is_other_color ? 'deeppink' : 'darkgreen'

            return (
              <Cell
                key={cell_index}
                style={{
                  color,
                  background,
                  paddingBottom: is_selected ? '6.5px' : '3.5px',
                  width: `calc(100% / ${row.length})`,
                  height: `calc(100% / ${row.length})`,
                  fontSize: is_selected ? '30px' : '20px',
                }}
              >
                {cell ? character : ''}
              </Cell>
            )
          }),
        )}
      </Cells>

      {/*      <Cells>
        {cells.map((row, row_index) =>
          row.map((cell, cell_index) => (
            <Cell
              key={cell_index}
              style={{
                width: `calc(100% / ${row.length})`,
                height: `calc(100% / ${row.length})`,
                color: 'cyan',
                background: cell ? 'indianred' : 'yellow',
              }}
            >
              {cell : ''}
            </Cell>
          )),
        )}
      </Cells>

      <Cells style={{ transform: 'scaleY(-1)' }}>
        {cells.map((row, row_index) =>
          row.map((cell, cell_index) => (
            <Cell
              key={cell_index}
              style={{
                width: `calc(100% / ${row.length})`,
                height: `calc(100% / ${row.length})`,
                color: 'cyan',
                background: cell ? 'indianred' : 'yellow',
              }}
            >
              {cell : ''}
            </Cell>
          )),
        )}
      </Cells>

      <Cells style={{ transform: 'scaleY(-1)' }}>
        {cells.map((row, row_index) =>
          row.map((cell, cell_index) => (
            <Cell
              key={cell_index}
              style={{
                width: `calc(100% / ${row.length})`,
                height: `calc(100% / ${row.length})`,
                color: 'cyan',
                background: cell ? 'indianred' : 'yellow',
              }}
            >
              {cell : ''}
            </Cell>
          )),
        )}
      </Cells>*/}
    </Wrapper>
  )
}

const cells_0 = character_0
const cells_8 = character_8

// const create_random_cells = () => {
//   const cells = [...Array(21).keys()].map((e) =>
//     [...Array(21).keys()].map((e) => random(0, 1)),
//   )
//   return cells
// }

let timeout_id
// const random_cells = create_random_cells()

const Wrapper = Component.flex.flex_wrap.article()
const Cells = Component.w100p.h100p.flex.flex_wrap.div()
const Cell = Component.mono.flex.ai_center.jc_center.div()
