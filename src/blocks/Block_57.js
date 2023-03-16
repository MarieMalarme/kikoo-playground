import { useState } from 'react'
import { get_invert_color } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_57 = ({ color }) => {
  const [amount, set_amount] = useState(9)
  const squares = [...Array(amount * amount).keys()]

  return (
    <Wrapper>
      <Squares>
        {squares.map((index) => (
          <Square
            key={index}
            style={{
              minHeight: `calc(100% / ${amount})`,
              minWidth: `calc(100% / ${amount})`,
              background: index % 2 ? color : get_invert_color(color),
            }}
          />
        ))}
      </Squares>

      <Button t20 onClick={() => amount < 20 && set_amount(amount + 2)}>
        More
      </Button>
      <Button b20 onClick={() => amount > 3 && set_amount(amount - 2)}>
        Less
      </Button>
    </Wrapper>
  )
}

const Wrapper = Component.flex.ai_center.jc_center.w100p.h100p.article()
const Squares = Component.w100p.h100p.flex.flex_wrap.div()
const Square = Component.div()
const Button = Component.sans.absolute.bg_white.b_rad50.pv5.ph20.button()
