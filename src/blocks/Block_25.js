import { useState } from 'react'
import { Component } from '../utils/flags'
import { Plus, Minus } from '../icons'

export const Block_25 = ({ color, is_selected }) => {
  const [count, set_count] = useState(5)
  const [wrapper, set_wrapper] = useState(null)
  const chunk = wrapper?.getBoundingClientRect().width / count

  const colors = [
    `hsl(${color.hue}, 100%, 70%)`,
    `hsl(${color.hue + 200}, 100%, 30%)`,
    `hsl(${color.hue + 400}, 100%, 70%)`,
  ]

  return (
    <Wrapper
      elemRef={set_wrapper}
      style={{
        background: `repeating-linear-gradient(0.1turn, transparent, ${
          colors[0]
        } ${chunk}px),
          repeating-linear-gradient(0.3turn, transparent, ${colors[1]} ${
          chunk / 2
        }px), repeating-linear-gradient(0.2turn, transparent, ${colors[2]} ${
          chunk / 4
        }px)`,
      }}
    >
      <Button onClick={() => count < 15 && set_count(count + 1)}>
        <Plus stroke="black" stroke_width={15} />
      </Button>
      <Count fs4vw={is_selected}>{count}</Count>
      <Button onClick={() => count > 1 && set_count(count - 1)}>
        <Minus stroke="black" stroke_width={15} />
      </Button>
    </Wrapper>
  )
}

const Wrapper = Component.flex.flex_column.jc_around.ai_center.article()
const Button =
  Component.c_pointer.bw2.ba.b_rad50p.w50.h50.flex.ai_center.jc_center.div()
const Count = Component.fs30.span()
