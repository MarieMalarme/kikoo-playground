import { useState } from 'react'
import { Component } from '../utils/flags'
import { MouseWheel } from '../icons'

export const Block_7 = ({ color, ...props }) => {
  const [current_circles, set_current_circles] = useState(1)
  const [wheeled, set_wheeled] = useState(base_radius)
  const [hovered, set_hovered] = useState(false)

  return (
    <Wrapper
      onMouseEnter={() => {
        set_hovered(true)
        document.body.style.overflow = 'hidden'
      }}
      onMouseLeave={() => {
        set_hovered(false)
        document.body.style.overflow = 'auto'
      }}
      onWheel={(event) => {
        const wheeling_up = event.deltaY < 0
        if (wheeling_up && wheeled <= base_radius) return
        set_wheeled(wheeling_up ? wheeled - 1 : wheeled + 1)
        const circles = Number(Math.floor(wheeled / base_radius).toFixed())
        if (circles !== current_circles) set_current_circles(circles)
      }}
      {...props}
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
const Wrapper = Component.flex.ai_center.jc_center.section()
