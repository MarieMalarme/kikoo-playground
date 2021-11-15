import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { MouseWheel } from '../icons'

export const Block_7 = ({ color, is_selected, hovered }) => {
  const [current_circles, set_current_circles] = useState(1)
  const [wheeled, set_wheeled] = useState(base_radius)
  const [wheelable, set_wheelable] = useState(true)

  useEffect(() => {
    document.body.style.overflow = wheelable ? 'hidden' : 'auto'
  }, [wheelable])

  return (
    <Wrapper
      onMouseOver={() => set_wheelable(wheeled > base_radius)}
      onMouseEnter={() => set_wheelable(wheeled > base_radius)}
      onMouseLeave={() => set_wheelable(false)}
      onWheel={(event) => {
        const wheeling = { down: event.deltaY > 0, up: event.deltaY < 0 }
        const reached = { top: wheeled <= base_radius, bottom: wheeled > 175 }

        const can_wheel =
          (wheeling.down && !reached.bottom) || (wheeling.up && !reached.top)
        set_wheelable(can_wheel)

        if (!can_wheel) return
        set_wheeled(wheeling.up ? wheeled - 1 : wheeled + 1)
        const circles = Number(Math.floor(wheeled / base_radius).toFixed())
        if (circles !== current_circles) set_current_circles(circles)
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 130 130"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(current_circles).keys()].map((index) => (
          <Circle
            key={index}
            index={index}
            wheeled={wheeled}
            base_radius={base_radius}
            color={color.value}
          />
        ))}
      </svg>
      <MouseWheel hovered={hovered} absolute height="15%" />
    </Wrapper>
  )
}

const Circle = ({ wheeled, base_radius, index, color }) => (
  <circle
    cx={65}
    cy={65}
    fill={color}
    r={wheeled - base_radius * index}
    style={{ filter: !(index % 2) && 'invert(1)' }}
  />
)

const base_radius = 20
const Wrapper = Component.flex.ai_center.jc_center.article()
