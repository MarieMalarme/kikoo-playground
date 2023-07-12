import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_76 = () => {
  const [svg, set_svg] = useState(null)
  const [counter, set_counter] = useState(255)
  const amplitude = svg?.getBoundingClientRect().height
  const width = svg?.getBoundingClientRect().width

  return (
    <Wrapper
      style={{ background: 'bisque' }}
      onMouseMove={() => set_counter(counter >= width + 50 ? 0 : counter + 3)}
      onTouchMove={() => set_counter(counter >= width + 50 ? 0 : counter + 1)}
    >
      <Svg elemRef={set_svg} xmlns="http://www.w3.org/2000/svg">
        {svg &&
          points.map((index) => (
            <Point
              key={index}
              index={index}
              width={width}
              counter={counter}
              amplitude={amplitude}
            />
          ))}
      </Svg>
    </Wrapper>
  )
}

const Point = ({ index, amplitude, width, counter }) => {
  const phi = index / 500
  const radius = 20
  const x = index
  const y = (Math.sin(x * frequency + phi) * amplitude) / 2 + amplitude / 2
  const is_visible = index < counter

  return (
    <circle
      fill={is_visible ? (index % 6 ? 'teal' : 'springgreen') : 'none'}
      cx={x - radius}
      cy={y + radius}
      r={radius}
    />
  )
}

const frequency = 0.06
const points_amount = 850
const points = [...Array(points_amount).keys()]

const Wrapper = Component.flex.ai_center.jc_center.article()
const Svg = Component.w100p.h20p.of_visible.svg()
