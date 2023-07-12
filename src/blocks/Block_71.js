import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_71 = ({ is_hovered, color }) => {
  const [columns, set_columns] = useState(columns_amounts[1])
  const [inc, set_inc] = useState(0)

  useEffect(() => {
    if (!is_hovered) return
    setTimeout(() => {
      set_inc(inc + 20)
    }, 100)
  }, [is_hovered, inc])

  const letters = [...Array(columns * columns).keys()]

  return (
    <Wrapper style={{ background: 'limegreen', color: 'pink' }}>
      {letters.map((index) => (
        <Letter
          key={index}
          style={{
            aspectRatio: '1 / 1',
            WebkitTextStroke: '1px pink',
            width: `calc(100% / ${columns})`,
            transform: `rotate(${index + inc}deg)`,
          }}
        >
          ꝏ
        </Letter>
      ))}

      <Buttons>
        {columns_amounts.map((amount) => (
          <Button
            key={amount}
            ba={amount === columns}
            white={amount === columns}
            bg_black={amount === columns}
            onClick={() => set_columns(amount)}
          >
            ×{amount}
          </Button>
        ))}
      </Buttons>
    </Wrapper>
  )
}

const columns_amounts = [6, 10, 14]

const Wrapper = Component.flex.flex_wrap.article()
const Letter = Component.fs15.div()
const Buttons = Component.b20.w100p.flex.jc_around.absolute.div()
const Button = Component.w60.b_rad50.sans.c_pointer.pa5.button()
