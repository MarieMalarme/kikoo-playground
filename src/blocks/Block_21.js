import { useState, useEffect } from 'react'
import { random } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_21 = ({ color, is_selected }) => {
  const [focused, set_focused] = useState(false)
  const [count, set_count] = useState(random(3, 7))
  const [wrapper, set_wrapper] = useState(null)
  const [dimensions, set_dimensions] = useState()

  useEffect(() => {
    setTimeout(() => focused && set_count(count < amount ? count + 1 : 1), 200)
  })

  useEffect(() => {
    if (!wrapper) return
    set_dimensions(wrapper.getBoundingClientRect())
  }, [wrapper])

  return (
    <Wrapper
      elemRef={set_wrapper}
      style={{ background: color.value }}
      onMouseOver={() => set_focused(true)}
      onMouseEnter={() => set_focused(true)}
      onMouseLeave={() => set_focused(false)}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        width={dimensions?.width}
        height={dimensions?.height}
      >
        {circles.map((index) => (
          <Circle key={index} index={index} count={count} color={color} />
        ))}
      </svg>
      <Count fs4vw={is_selected} f_invert100 style={{ color: color.value }}>
        {count}
      </Count>
    </Wrapper>
  )
}

const Circle = ({ index, count, color }) => {
  const { x, y } = calc_coords(index)
  const visible = index + 1 <= count

  return (
    <circle
      style={{ filter: 'invert(100%)', mixBlendMode: 'difference' }}
      fill={visible ? `${color.value + 150}, 70%, 70%` : 'none'}
      r={size / amount}
      cx={x}
      cy={y}
    />
  )
}

const calc_coords = (point) => {
  const radians = 90 * (Math.PI / 180)
  const theta = (Math.PI * 2) / circles.length
  const angle = theta * point - radians

  const x = radius * Math.cos(angle) + center
  const y = radius * Math.sin(angle) + center

  return { x, y }
}

const size = 100
const center = size / 2
const radius = center - 25

const amount = 10
const circles = [...Array(amount).keys()]

const Wrapper = Component.flex.ai_center.jc_center.article()
const Count = Component.absolute.div()
