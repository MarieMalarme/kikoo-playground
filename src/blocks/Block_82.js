import { useState } from 'react'
import { Component } from '../utils/flags'
import { shape_7 as pixels_grid } from './pixels_grids'

export const Block_82 = ({ is_hovered }) => {
  const [inc, set_inc] = useState(0)
  const [colors, set_colors] = useState({
    background: '#e8ff75', // '#e8d1ff', // '#ca94ff',
    number: '#6600ff', // '#00ff4c', // '#1100ff',
    landscape: '#eeff70', // '#f2ff42',
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
                ? `linear-gradient(to right, ${colors.number}, transparent ${
                    (((cell_index + 1 + (row_index + 1)) * 3 + inc) % 60) + 5
                  }%)`
                : `linear-gradient(${colors.number}, transparent ${
                    (((cell_index + 1 + (row_index + 1)) * 2 + inc) % 30) + 5
                  }%, transparent ${
                    (((cell_index + 1 + (row_index + 1)) * 2 + inc) % 30) + 5
                  }%)`,

              // background: cell
              //   ? `linear-gradient(-45deg, ${colors.number} ${
              //       (((cell_index + 1 + (row_index + 1)) * 3 + inc) % 45) + 5
              //     }%, transparent ${
              //       (((cell_index + 1 + (row_index + 1)) * 3 + inc) % 45) + 5
              //     }%)`
              //   : `linear-gradient(${colors.landscape}, transparent ${
              //       (((cell_index + 1 + (row_index + 1)) * 2 + inc) % 30) + 5
              //     }%, transparent ${
              //       (((cell_index + 1 + (row_index + 1)) * 2 + inc) % 30) + 5
              //     }%)`,

              // background: cell
              //   ? `linear-gradient(to left, ${colors.number}, transparent ${
              //       (((cell_index + 1 + (row_index + 1)) * 3 + inc) % 50) + 5
              //     }%)`
              //   : `linear-gradient(-45deg, ${colors.landscape} ${
              //       (((cell_index + 1 + (row_index + 1)) * 2 + inc) % 30) + 2
              //     }%, transparent ${
              //       (((cell_index + 1 + (row_index + 1)) * 2 + inc) % 30) + 2
              //     }%)`,

              // background: cell
              //   ? `radial-gradient(${colors.landscape}, transparent ${
              //       (((cell_index + 1 + (row_index + 1)) * 3 + inc) % 70) + 5
              //     }%)`
              //   : `radial-gradient(${colors.number}, transparent ${
              //       (((cell_index + 1 + (row_index + 1)) * 2 + inc) % 20) + 5
              //     }%)`,

              // background: cell
              //   ? `linear-gradient(-45deg, ${colors.landscape} ${
              //       (((cell_index + 1 + (row_index + 1)) * 3 + inc) % 45) + 5
              //     }%, transparent ${
              //       (((cell_index + 1 + (row_index + 1)) * 3 + inc) % 45) + 5
              //     }%)`
              //   : `linear-gradient(-45deg, ${colors.number}, transparent ${
              //       (((cell_index + 1 + (row_index + 1)) * 2 + inc) % 20) + 5
              //     }%)`,
            }}
          ></Cell>
        )),
      )}

      <Input
        min={0}
        max={150}
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
const Input = Component.mb5.absolute.b30.b20__xs.w320.w40p__xs.input()
