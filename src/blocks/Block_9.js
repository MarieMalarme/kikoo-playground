import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'
import galaxy from '../images/galaxy.jpeg'

const grid = {
  xs: { columns: 4, rows: 8 },
  l: { columns: 5, rows: 6 },
}

export const Block_9 = () => {
  const media_query_xs = window.matchMedia('(max-width: 600px)')

  const [modes, set_modes] = useState([])
  const [selected_mode, set_selected_mode] = useState('normal')
  const [{ columns, rows }, set_grid] = useState({
    columns: media_query_xs.matches ? grid.xs.columns : grid.l.columns,
    rows: media_query_xs.matches ? grid.xs.rows : grid.l.rows,
  })

  useEffect(() => {
    const handle_change = ({ matches }) => {
      const grid_size = grid[matches ? 'xs' : 'l']
      set_grid({ columns: grid_size.columns, rows: grid_size.rows })
    }

    media_query_xs.addEventListener('change', handle_change)
    return () => media_query_xs.removeEventListener('change', handle_change)
  }, [media_query_xs])

  useEffect(() => {
    const cells = {}
    const modes = blend_modes.map((mode) => {
      const cell = generate_cell(cells, columns, rows)
      return [mode, cell]
    })
    set_modes(modes)
  }, [columns, rows])

  return (
    <Wrapper className="blend-mode-grid">
      <Image
        style={{
          mixBlendMode: selected_mode,
          background: ` center / cover url(${galaxy})`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      />
      {modes.map(([mode, cell]) => (
        <Mode
          key={mode}
          style={{ gridArea: cell }}
          onMouseOver={() => set_selected_mode(mode)}
          bg_white={mode === selected_mode}
          b_white={mode !== selected_mode}
          black={mode === selected_mode}
          ba={mode !== selected_mode}
        >
          {mode}
        </Mode>
      ))}
    </Wrapper>
  )
}

const generate_cell = (cells, columns = 5, rows = 5) => {
  let cell

  do {
    const cell_column = random(1, columns)
    const cell_row = random(1, rows)
    cell = `${cell_row} / ${cell_column}`
  } while (cells[cell])

  cells[cell] = true
  return cell
}

const blend_modes = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
]

const Wrapper = Component.pa10.article()
const Image = Component.absolute.w100p.h100p.div()
const Mode =
  Component.zi1.w100.of_hidden.ws_nowrap.white.c_pointer.fs9.ls1.uppercase.flex.ai_center.jc_center.pa5.h25.b_rad25.div()
