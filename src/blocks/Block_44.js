import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_44 = ({ hovered, color }) => {
  const [gradients, set_gradients] = useState(base_gradients)
  const active_gradients = Object.values(gradients).filter((g) => g.is_on)
  const gradients_strings = active_gradients.map((g) => `${g.gradient}, `)
  const background = `${gradients_strings.join('')} rgb(${colors[0]})`

  return (
    <Wrapper style={{ background }}>
      {Object.entries(gradients).map(
        ([position, { gradient, rotation, is_on }], index) => (
          <Switch
            key={index}
            style={{ [position]: 30, transform: `rotate(${rotation}deg)` }}
            jc_flex_end={is_on}
            onClick={() =>
              set_gradients({
                ...gradients,
                [position]: { gradient, rotation, is_on: !is_on },
              })
            }
          >
            <SwitchDot />
          </Switch>
        ),
      )}
    </Wrapper>
  )
}

const colors = ['218, 165, 32', '127, 255, 212', '205, 92, 92']
const base_gradients = {
  top: {
    is_on: true,
    rotation: 90,
    gradient: `linear-gradient(180deg, rgba(${colors[1]}, 0.75), rgba(${colors[1]}, 0) 50%)`,
  },
  bottom: {
    is_on: true,
    rotation: 270,
    gradient: `linear-gradient(0deg, rgba(${colors[1]}, 0.75), rgba(${colors[1]}, 0) 50%)`,
  },
  left: {
    is_on: true,
    rotation: 0,
    gradient: `linear-gradient(90deg, rgba(${colors[2]}, 0.75), rgba(${colors[2]}, 0) 50%)`,
  },
  right: {
    is_on: true,
    rotation: 180,
    gradient: `linear-gradient(270deg, rgba(${colors[2]}, 0.75), rgba(${colors[2]}, 0) 50%)`,
  },
}

const Wrapper = Component.flex.ai_center.jc_center.article()
const Switch =
  Component.c_pointer.absolute.w35.h20.ba.b_black.b_rad50.flex.ai_center.ph5.div()
const SwitchDot = Component.w10.h10.bg_black.b_rad50p.div()
