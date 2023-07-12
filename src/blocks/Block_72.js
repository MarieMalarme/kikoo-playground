import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_72 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState({ x: 100, y: 100 })
  const [colors, set_colors] = useState(['#80fff7', '#ffffff', '#5f2525'])
  const [params, set_params] = useState({
    columns_amount: 31,
    rows_amount: 30,
    max_inc: 0.5,
    range_size: 90,
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
              mouse={mouse}
              wrapper={wrapper}
              params={params}
              colors={colors}
            />
          ))}
        </Row>
      ))}

      <Controls>
        <Settings
          style={{
            backdropFilter: 'blur(4px)',
            background: 'hsla(0, 0%, 100%, 0.25)',
          }}
        >
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

          <Setting>
            Colors
            <ColorsInputs>
              <input
                type="color"
                value={colors[0]}
                onInput={(event) =>
                  set_colors([event.target.value, colors[1], colors[2]])
                }
              />
              <input
                type="color"
                value={colors[1]}
                onInput={(event) =>
                  set_colors([colors[0], event.target.value, colors[2]])
                }
              />
              <input
                type="color"
                value={colors[2]}
                onInput={(event) =>
                  set_colors([colors[0], colors[1], event.target.value])
                }
              />
            </ColorsInputs>
          </Setting>
        </Settings>
      </Controls>
    </Wrapper>
  )
}

const Item = ({ mouse, index, wrapper, params, colors }) => {
  const [elem, set_elem] = useState(null)
  const { columns_amount, max_inc, range_size } = params
  const range = (wrapper?.getBoundingClientRect().height * range_size) / 100

  // calculate the distance between the item and the wrapper center
  const center = wrapper?.getBoundingClientRect().height / 2
  const elem_center = elem?.offsetTop + elem?.getBoundingClientRect().height / 2
  const distance_from_center = Math.abs(elem_center - center)
  const is_in_range = distance_from_center < range

  const crossed_value = max_inc * (1 - distance_from_center / range)
  const base = 1 + (is_in_range ? crossed_value : 0)

  const middle_index = Math.floor(columns_amount / 2)
  const power = index <= middle_index ? index : columns_amount - 1 - index

  return (
    <Cell
      elemRef={set_elem}
      style={{
        width: `${Math.pow(base, power) * 100}%`,
        background:
          index === middle_index
            ? `linear-gradient(to left, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[1]}, ${colors[0]})`
            : index <= middle_index
            ? `linear-gradient(to left, ${colors[0]}, ${colors[1]}, ${colors[2]})`
            : `linear-gradient(to left, ${colors[2]}, ${colors[1]}, ${colors[0]})`,
      }}
    />
  )
}

const inputs = {
  columns_amount: { min: 11, max: 41, step: 2, label: 'Columns' },
  rows_amount: { min: 10, max: 50, label: 'Rows' },
  max_inc: { min: 0.1, max: 0.5, step: 0.1, label: 'Increment' },
  range_size: { min: 10, max: 100, label: 'Range' },
}

const Wrapper = Component.article()
const Row = Component.flex.w100p.div()
const Cell = Component.text_center.h100p.flex.ai_center.jc_center.div()
const Controls = Component.absolute.w100p.b20.b10__xs.l0.ph30.ph10__xs.div()
const Settings =
  Component.b_rad50.w100p.ph20.pv15.pv10__xs.fs13.flex.ai_center.jc_between.div()
const Setting = Component.flex.flex_column.ai_center.w15p.h35.jc_between.div()
const ColorsInputs = Component.w65.w55__xs.flex.jc_between.div()
const Input = Component.w65.w50__xs.mb7.input()
