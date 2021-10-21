import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_17 = ({ color, ...props }) => {
  const [focused, set_focused] = useState(false)
  const [count, set_count] = useState(10)

  useEffect(() => {
    const update_count = (event) => {
      if (!focused) return
      event.preventDefault()
      if (event.key === 'ArrowDown') count > 1 && set_count(count - 1)
      if (event.key === 'ArrowUp') count < 99 && set_count(count + 1)
    }
    document.addEventListener('keydown', update_count)
    return () => document.removeEventListener('keydown', update_count)
  })

  return (
    <Wrapper
      onMouseEnter={() => set_focused(true)}
      onMouseLeave={() => set_focused(false)}
      style={{
        background: `repeating-radial-gradient(#e66465, #9198e5 ${count}%)`,
      }}
    >
      <Instruction>
        <Arrow>▲</Arrow>
        <div>Arrow up</div>
      </Instruction>
      <Instruction>
        <div>Arrow down</div>
        <Arrow>▼</Arrow>
      </Instruction>
    </Wrapper>
  )
}

const Wrapper = Component.flex.flex_column.ai_center.jc_between.pa15.section()
const Instruction = Component.fs15.flex.flex_column.ai_center.div()
const Arrow = Component.fs12.b_rad4.mv10.ba.pv5.ph15.div()
