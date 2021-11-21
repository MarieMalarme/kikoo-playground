import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_17 = ({ color, is_selected, hovered }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [count, set_count] = useState(20)

  const x = wrapper?.getBoundingClientRect().width / 2
  const y = wrapper?.getBoundingClientRect().height / 2

  const update_count = (event) => {
    if (!hovered) return
    event.preventDefault()
    if (event.key === 'ArrowDown') count > 1 && set_count(count - 1)
    if (event.key === 'ArrowUp') count < 99 && set_count(count + 1)
  }

  return (
    <Wrapper
      onKeyDown={update_count}
      elemRef={set_wrapper}
      pa50={is_selected}
      style={{
        background: `repeating-radial-gradient(circle, fuchsia, yellow ${count}%) ${x}px ${y}px`,
      }}
    >
      <Instruction
        onClick={() => count > 1 && set_count(count - 1)}
        fs40={is_selected}
      >
        <Arrow
          mb10={!is_selected}
          mb30={is_selected}
          fs30={is_selected}
          ph40={is_selected}
          pv10={is_selected}
        >
          ▲
        </Arrow>
        Arrow up
      </Instruction>
      <Instruction
        onClick={() => count < 99 && set_count(count + 1)}
        fs40={is_selected}
      >
        Arrow down
        <Arrow
          mt10={!is_selected}
          mt30={is_selected}
          fs30={is_selected}
          ph40={is_selected}
          pv10={is_selected}
        >
          ▼
        </Arrow>
      </Instruction>
    </Wrapper>
  )
}

const Wrapper = Component.flex.flex_column.ai_center.jc_between.pa25.article()
const Instruction = Component.fs15.flex.flex_column.ai_center.div()
const Arrow = Component.fs12.b_rad4.ba.pv5.ph15.div()
