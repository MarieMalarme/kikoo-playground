import { useState, useEffect } from 'react'
import { random } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_47 = ({ color, is_selected, hovered }) => {
  const [count, set_count] = useState(random(3, 7))
  const [wrapper, set_wrapper] = useState(null)
  const [dimensions, set_dimensions] = useState()

  useEffect(() => {
    setTimeout(() => hovered && set_count(count < amount ? count + 1 : 1), 200)
  })

  useEffect(() => {
    if (!wrapper) return
    const resizeObserver = new ResizeObserver(() => {
      set_dimensions(wrapper.getBoundingClientRect())
    })
    resizeObserver.observe(wrapper)
    return () => resizeObserver.disconnect()
  }, [wrapper])

  return (
    <Wrapper elemRef={set_wrapper} style={{ background: color.value }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        width={dimensions?.width}
        height={dimensions?.height}
      >
        {shapes.map((index) => (
          <Shape key={index} index={index} count={count} color={color} />
        ))}
      </svg>
      <Count fs4vw={is_selected} f_invert100 style={{ color: color.value }}>
        {count}
      </Count>
    </Wrapper>
  )
}

const Shape = ({ index, count, color }) => {
  const { x, y } = calc_coords(index)
  const visible = index + 1 <= count

  return (
    <Svg
      width={size / 2}
      height={size / 2}
      x={x - size / 2 / 2}
      y={y - size / 2 / 2}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'invert(100%)', mixBlendMode: 'difference' }}
    >
      <path
        fill={visible ? 'black' : 'none'}
        d="M600.28 77.53a117.76 117.76 0 0 0 127.54 52.82c85.34-20.3 162.13 56.49 141.83 141.83a117.76 117.76 0 0 0 52.82 127.54c74.71 46 74.71 154.57 0 200.56a117.76 117.76 0 0 0-52.82 127.54C890 813.16 813.16 890 727.82 869.65a117.76 117.76 0 0 0-127.54 52.82c-46 74.71-154.57 74.71-200.56 0a117.76 117.76 0 0 0-127.54-52.82C186.84 890 110.05 813.16 130.35 727.82a117.76 117.76 0 0 0-52.82-127.54c-74.71-46-74.71-154.57 0-200.56a117.76 117.76 0 0 0 52.82-127.54c-20.3-85.34 56.49-162.13 141.83-141.83a117.76 117.76 0 0 0 127.54-52.82c45.99-74.71 154.57-74.71 200.56 0Z"
      />
    </Svg>
  )
}

const calc_coords = (point) => {
  const radians = 90 * (Math.PI / 180)
  const theta = (Math.PI * 2) / shapes.length
  const angle = theta * point - radians

  const x = radius * Math.cos(angle) + center
  const y = radius * Math.sin(angle) + center

  return { x, y }
}

const size = 20
const center = size / 2
const radius = center

const amount = 10
const shapes = [...Array(amount).keys()]

const Wrapper = Component.flex.ai_center.jc_center.article()
const Count = Component.absolute.div()
const Svg = Component.f_invert100.blend_difference.svg()
