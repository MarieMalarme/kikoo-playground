import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_27 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [current_point, set_current_point] = useState({ x: 0, y: 0 })
  const [points, set_points] = useState([])

  const width = wrapper?.getBoundingClientRect().width
  const height = wrapper?.getBoundingClientRect().height

  useEffect(() => {
    if (!wrapper) return

    // create a random shape
    const { width, height } = wrapper.getBoundingClientRect()
    const random_x = () => random(15, width - 15)
    const random_y = () => random(15, height - 15)
    const points = Array(10).fill()
    const random_points = points.flatMap((e) => [random_x(), random_y()])
    set_points(random_points)

    set_current_point({ x: random_x(), y: random_y() })
  }, [wrapper])

  return (
    <Wrapper
      elemRef={set_wrapper}
      onDoubleClick={() => set_points([])}
      onClick={() => set_points([...points, current_point.x, current_point.y])}
      onMouseMove={(event) => {
        const { offsetLeft, offsetTop } = wrapper.offsetParent
        const x = event.clientX - offsetLeft
        const y = event.clientY - (offsetTop - window.pageYOffset)
        set_current_point({ x, y })
      }}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width || 0} ${height || 0}`}
      >
        <circle
          fill={color.value}
          cx={current_point.x || '50%'}
          cy={current_point.y || '50%'}
          r={radius}
        />
        <polyline
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={radius * 2}
          fill="none"
          stroke={color.value}
          points={[...points, current_point.x, current_point.y].join()}
        />
      </Svg>

      <Instruction l20>Click to draw a line</Instruction>
      <Instruction r20>Double click to clear</Instruction>
    </Wrapper>
  )
}

const radius = 10
const Wrapper = Component.article()
const Svg = Component.f_invert100.svg()
const Instruction = Component.absolute.b10.zi1.div()
