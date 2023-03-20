import { useState } from 'react'
import { Component } from '../utils/flags'
import galaxy from '../images/galaxy.jpeg'

export const Block_62 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [params, set_params] = useState({
    columns_amount: 51,
    rows_amount: 30,
    max_inc: 0.4,
    range_size: 50,
  })

  const columns = [...Array(params.columns_amount).keys()]
  const rows = [...Array(params.rows_amount).keys()]

  return (
    <Wrapper id="galaxy-grid" elemRef={set_wrapper}>
      <Grid
        elemRef={set_wrapper}
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
                wrapper={wrapper}
                params={params}
              />
            ))}
          </Row>
        ))}
      </Grid>

      <Input
        t10
        min={21}
        max={51}
        step={2}
        type="range"
        defaultValue={params.columns_amount}
        onInput={(event) =>
          set_params({
            ...params,
            columns_amount: Number(event.target.value),
          })
        }
      />

      <Input
        b10
        min={0}
        max={0.4}
        step={0.1}
        type="range"
        defaultValue={params.max_inc}
        onInput={(event) =>
          set_params({
            ...params,
            max_inc: Number(event.target.value),
          })
        }
      />
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
  const power =
    index <= middle_index
      ? middle_index - index
      : middle_index - (columns_amount - 1 - index)

  return (
    <Cell
      elemRef={set_elem}
      style={{
        width: `${Math.pow(base, power) * 100}%`,
        background: `center / cover url(${galaxy})`,
        filter: index % 2 ? 'invert(100%)' : '',
        transform: index <= middle_index ? 'scaleX(-1)' : '',
      }}
    />
  )
}

const Wrapper = Component.flex.flex_column.ai_center.jc_center.article()
const Grid = Component.w100p.h100p.div()
const Row = Component.flex.w100p.div()
const Cell = Component.text_center.h100p.flex.ai_center.jc_center.div()
const Input = Component.absolute.input()
