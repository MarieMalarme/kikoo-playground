import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_7 = (props) => {
  const [current_circles, set_current_circles] = useState(1)
  const [wheeled, set_wheeled] = useState(base_radius)

  return (
    <Wrapper
      onMouseEnter={() => (document.body.style.overflow = 'hidden')}
      onMouseLeave={() => (document.body.style.overflow = 'auto')}
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
            color={props.style.background}
          />
        ))}
      </svg>
      <MouseWheel />
    </Wrapper>
  )
}

const MouseWheel = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 170" height="15%">
    <g fill="none" stroke="white" strokeWidth="5" strokeLinecap="round">
      <path d="M42.5 94.75a17.5 17.5 0 0 1-35 0v-19.5a17.5 17.5 0 0 1 35 0Z" />
      <path d="M25 73v5" />
      <path d="m15.5 21.05 9.5-9.5 9.5 9.5M15.5 36.59l9.5-9.5 9.5 9.5M34.5 148.95l-9.5 9.5-9.5-9.5M34.5 133.41l-9.5 9.5-9.5-9.5" />
    </g>
  </Svg>
)

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
const Wrapper = Component.relative.of_hidden.flex.ai_center.jc_center.section()
const Svg = Component.absolute.svg()
