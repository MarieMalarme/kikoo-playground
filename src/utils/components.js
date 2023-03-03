import { useState } from 'react'
import { Component } from '../utils/flags'

export const Select = ({ list, value, set_value, hover_select, ...props }) => {
  const [is_open, set_is_open] = useState(false)
  const [hovered_option, set_hovered_option] = useState()
  const options = hover_select ? list : list.filter((item) => item !== value)

  return (
    <SelectWrapper id="select" onClick={() => set_is_open(!is_open)} {...props}>
      <Arrow />
      <Options>
        <SelectedOption style={{ height: '34px' }}>{value}</SelectedOption>
        <UnselectedOptions none={!is_open}>
          {options.map((item, index) => (
            <Option
              key={item}
              fs16={hovered_option === item}
              onMouseEnter={() => set_hovered_option(item)}
              onMouseOver={() => hover_select && set_value(item)}
              onClick={() => set_value(item)}
            >
              {item}
            </Option>
          ))}
        </UnselectedOptions>
      </Options>
    </SelectWrapper>
  )
}

const Arrow = () => (
  <Svg width={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130">
    <path
      fill="none"
      stroke="black"
      strokeWidth={7}
      d="m115 42.26-50 50-50-50"
    />
  </Svg>
)

const SelectWrapper =
  Component.ba.relative.flex.ai_center.c_pointer.w100p.sans.ph10.ol_none.b_rad20.div()
const Options = Component.b_rad10.zi1.w100p.absolute.t0.l0.div()
const SelectedOption = Component.flex.ai_center.jc_center.div()
const UnselectedOptions = Component.shadow_a_s.mt5.pv10.b_rad10.bg_white.div()
const Option = Component.w100p.lh21.flex.ai_center.jc_center.ellipsis.span()
const Svg = Component.absolute.r10.mt2.svg()
