import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_66 = ({ is_selected, is_hovered, color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [count, set_count] = useState(50)

  const update_count = (event) => {
    if (!is_hovered) return
    event.preventDefault()
    if (event.key === 'ArrowDown') count < 50 && set_count(count + 2)
    if (event.key === 'ArrowUp') count > 0 && set_count(count - 2)
  }

  useEffect(() => {
    const { matches } = window.matchMedia('(max-width: 600px)')
    if (!wrapper || matches) return
    wrapper.focus()
  }, [is_hovered])

  return (
    <Wrapper
      tabIndex="0"
      elemRef={set_wrapper}
      onKeyDown={update_count}
      style={{ background: 'var(--parrot2)' }}
    >
      <Stripes count={count} rotation={180} />
      <Stripes count={count} rotation={180} />
      <Stripes count={count} />
      <Stripes count={count} />

      <Instructions>
        <Instruction
          onClick={() => count > 0 && set_count(count - 2)}
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
          onClick={() => count < 49 && set_count(count + 2)}
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
      </Instructions>
    </Wrapper>
  )
}

const Stripes = ({ rotation = 0, count }) => (
  <StripesWrapper style={{ transform: `rotate(${rotation}deg)` }}>
    {stripes.map((index) => {
      const middle_index = Math.ceil(stripes_amount / 2)
      const is_lower_index = index < middle_index
      const interval_index = is_lower_index ? index : stripes_amount - 1 - index
      const percentage = interval_index * (stripes_amount - 1) + count
      const background = `linear-gradient(to top, var(--parrot2), var(--cherry3) ${percentage}%, var(--parrot2))`
      return <Stripe key={index} style={{ background }} />
    })}
  </StripesWrapper>
)

const stripes_amount = 11
const stripes = [...Array(stripes_amount).keys()]

const Wrapper = Component.flex.flex_wrap.article()
const StripesWrapper = Component.min_w50p.min_h50p.flex.div()
const Stripe = Component.h100p.w10p.div()
const Instructions =
  Component.h100p.w100p.absolute.t0.pa20.flex.flex_column.ai_center.jc_between.div()
const Instruction = Component.fs15.flex.flex_column.ai_center.div()
const Arrow = Component.fs12.b_rad4.ba.pv5.ph15.div()
