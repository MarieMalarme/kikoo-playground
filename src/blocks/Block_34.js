import { useState } from 'react'
import { random } from '../utils/toolbox'
import { Component } from '../utils/flags'
import { shape_9 as pixels_grid } from './pixels_grids'

export const Block_34 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)

  return (
    <Wrapper elemRef={set_wrapper}>
      {pixels_grid.map((row, row_index) =>
        row.map((cell, cell_index) => (
          <Cell
            key={cell_index}
            wrapper={wrapper}
            color={color}
            index={cell_index + row_index * row.length}
            cell={cell}
            row={row}
          />
        )),
      )}
    </Wrapper>
  )
}

const Cell = ({ wrapper, color, index, cell, row }) => {
  const is_opaque = opaque_cells[index]
  const base_opacity = is_opaque ? random(0, 90) / 100 : 1
  const [opacity, set_opacity] = useState(base_opacity)

  return (
    <Box
      onMouseOver={() => opacity && set_opacity(opacity - 0.5)}
      style={{
        background: color.value,
        opacity: cell ? 1 : opacity,
        width: `calc(100% / ${row.length})`,
        height: `calc(100% / ${row.length})`,
      }}
    />
  )
}

const opaque_cells = pixels_grid.flatMap((row) => row.map(() => random(0, 1)))

const Wrapper = Component.blend_exclusion.w100p.h100p.flex.flex_wrap.article()
const Box = Component.f_invert100.fs9.white.lh20.flex.ai_center.jc_center.div()
