import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_59 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState({ x: 100, y: 100 })
  const [params, set_params] = useState({
    fs_base: 5,
    fs_multiplier: 4,
    max_inc: 0.3,
    columns_amount: 21,
    rows_amount: 10,
    range_size: 150,
  })

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    // translate the mouse position in the page to the coordinate system of the block
    const translator_x = wrapper.offsetParent.offsetLeft
    const translator_y = wrapper.offsetParent.offsetTop
    const x = event.pageX - translator_x
    const y = event.pageY - translator_y
    set_mouse({ x, y })
  }

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  const columns = [...Array(params.columns_amount).keys()]
  const rows = [...Array(params.rows_amount).keys()]

  return (
    <Wrapper
      elemRef={set_wrapper}
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
      style={{
        gridTemplateColumns: `repeat(${params.columns_amount}, 1fr)`,
        gridTemplateRows: `repeat(${params.rows_amount}, 1fr)`,
      }}
    >
      {rows.map((row_index) => (
        <Row
          key={row_index}
          style={{ height: `calc(100% / ${params.rows_amount})` }}
        >
          {columns.map((column_index) => (
            <Item
              key={`${row_index}-${column_index}`}
              index={column_index}
              color={color}
              mouse={mouse}
              wrapper={wrapper}
              params={params}
            />
          ))}
        </Row>
      ))}

      <Controls>
        {Object.entries(inputs).map(([param, settings], index) => (
          <Setting key={param}>
            {settings.label}
            <Input
              type="range"
              min={settings.min}
              max={settings.max}
              step={settings.step || 1}
              defaultValue={params[param]}
              className="range-input-thin"
              onInput={(event) =>
                set_params({ ...params, [param]: Number(event.target.value) })
              }
            />
          </Setting>
        ))}
      </Controls>
    </Wrapper>
  )
}

const Item = ({ mouse, index, color, wrapper, params }) => {
  const [elem, set_elem] = useState(null)
  const { fs_base, fs_multiplier, columns_amount, max_inc, range_size } = params

  // calculate the distance between the item and the mouse on the y axis
  const distance_from_mouse_y = Math.abs(elem?.offsetTop - mouse.y)
  const is_in_range = distance_from_mouse_y < range_size
  const crossed_value = max_inc * (1 - distance_from_mouse_y / range_size)
  const base = 1 + (is_in_range ? crossed_value : 0)

  const middle_index = Math.floor(columns_amount / 2)
  const power = index <= middle_index ? index : columns_amount - 1 - index

  return (
    <Cell
      elemRef={set_elem}
      style={{
        width: `${Math.pow(base, power) * 100}%`,
        fontSize: `${Math.pow(base, power) * fs_multiplier + fs_base}px`,
        color: 'aquamarine',
        background: 'plum',
      }}
    >
      <Letter>{word[index]}</Letter>
    </Cell>
  )
}

const inputs = {
  columns_amount: { min: 11, max: 41, step: 2, label: 'Columns' },
  rows_amount: { min: 10, max: 50, label: 'Rows' },
  max_inc: { min: 0.1, max: 0.5, step: 0.1, label: 'Max increment' },
  fs_multiplier: { min: 0, max: 10, label: 'Font increment' },
  fs_base: { min: 1, max: 30, label: 'Font size base' },
  range_size: { min: 50, max: 200, label: 'Mouse range' },
}

const word =
  'HEXACHLOROCYCLOHEXANEHEXACHLOROCYCLOHEXANEHEXACHLOROCYCLOHEXANEHEXACHLOROCYCLOHEXANE'

const Wrapper = Component.article()
const Row = Component.flex.w100p.div()
const Cell = Component.text_center.h100p.flex.ai_center.jc_center.div()
const Letter = Component.absolute.div()
const Controls =
  Component.flex_wrap__xs.w100p.b40.b10__xs.l0.ph30.absolute.fs13.flex.ai_center.jc_between.div()
const Setting =
  Component.w30p__xs.mb20__xs.flex.flex_column.ai_center.w15p.div()
const Input = Component.w65.mt7.input()
