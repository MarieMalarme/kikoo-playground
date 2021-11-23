import { Fragment, useState } from 'react'
import { Component } from '../utils/flags'
import { Arrow, Plus } from '../icons'

export const Block_13 = ({ color, is_selected }) => {
  const [points, set_points] = useState([])
  const [shape_index, set_shape_index] = useState(0)

  const shape = shapes[shape_index]
  const path = shape.reduce((acc, { cx, cy }) => [...acc, cx, cy], []).join()
  const point_color = `hsl(${color.hue}, 70%, 85%)`

  return (
    <Wrapper style={{ background: `hsl(${color.hue}, 70%, 35%)` }}>
      <Buttons
        is_selected={is_selected}
        set_points={set_points}
        shape_index={shape_index}
        set_shape_index={set_shape_index}
      />
      <svg
        style={{ maxHeight: is_selected && '90vh' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 230 230"
      >
        <polyline
          strokeWidth={0.5}
          fill="none"
          stroke={point_color}
          points={points.join()}
        />
        {shape.map(({ cx, cy }, index) => (
          <Point
            cx={cx}
            cy={cy}
            key={index}
            path={path}
            index={index}
            points={points}
            point_color={point_color}
            states={{ shape, shape_index, set_shape_index, set_points }}
          />
        ))}
      </svg>
    </Wrapper>
  )
}

const Buttons = ({ shape_index, set_shape_index, set_points, is_selected }) => (
  <Fragment>
    <Button
      l10
      pa25={is_selected}
      fs30={is_selected}
      onClick={() => set_points([])}
    >
      <Plus mr5 stroke="black" width={is_selected ? 30 : 12} rotation={45} />
      Clear
    </Button>
    <Button
      l70__xs
      pa25={is_selected}
      fs30={is_selected}
      jc_flex_end
      onClick={() => {
        const is_last_index = shape_index === shapes.length - 1
        set_shape_index(is_last_index ? 0 : shape_index + 1)
        set_points([])
      }}
    >
      Next
      <Arrow ml7 stroke="black" width={is_selected ? 30 : 12} />
    </Button>
  </Fragment>
)

const Point = ({ cx, cy, path, index, points, point_color, states }) => {
  const { shape, shape_index, set_shape_index, set_points } = states
  const is_last_point = index === shape.length - 1

  return (
    <Dot
      fill={point_color}
      key={index}
      onClick={() => {
        // ignore if the last clicked point is the same
        if (points.at(-2) === cx && points.at(-1) === cy) return

        // check if the drawing is finished to change to the next shape
        const path_finished = [...points, cx, cy].join() === path

        if (is_last_point && path_finished) {
          const is_last_index = shape_index === shapes.length - 1
          set_shape_index(is_last_index ? 0 : shape_index + 1)
          set_points([])
          return
        }

        set_points([...points, cx, cy])
      }}
    >
      <circle stroke="transparent" strokeWidth={3} cx={cx} cy={cy} r={1} />
      <text fontSize={5} textAnchor="middle" x={cx} y={cy - 3}>
        {index + 1}
      </text>
    </Dot>
  )
}

const star = [
  { cx: 67.5, cy: 92.5 },
  { cx: 47.5, cy: 47.5 },
  { cx: 98.5, cy: 66.5 },
  { cx: 120.5, cy: 25.5 },
  { cx: 137.5, cy: 71.5 },
  { cx: 177.5, cy: 52.5 },
  { cx: 173.5, cy: 92.5 },
  { cx: 210.5, cy: 108.5 },
  { cx: 167.5, cy: 132.5 },
  { cx: 182.5, cy: 182.5 },
  { cx: 129.5, cy: 161.5 },
  { cx: 117.5, cy: 204.5 },
  { cx: 93.5, cy: 164.5 },
  { cx: 51.5, cy: 183.5 },
  { cx: 66.5, cy: 132.5 },
  { cx: 18.5, cy: 115.5 },
  { cx: 83.5, cy: 100.5 },
  { cx: 63.5, cy: 61.5 },
  { cx: 105.5, cy: 89.5 },
  { cx: 121.5, cy: 47.5 },
  { cx: 133.5, cy: 89.5 },
  { cx: 163.5, cy: 70.5 },
  { cx: 150.5, cy: 105.5 },
  { cx: 180.5, cy: 110.5 },
  { cx: 146.5, cy: 126.5 },
  { cx: 167.5, cy: 165.5 },
  { cx: 120.5, cy: 142.5 },
  { cx: 114.5, cy: 179.5 },
  { cx: 101.5, cy: 144.5 },
  { cx: 70.5, cy: 160.5 },
  { cx: 93.5, cy: 128.5 },
  { cx: 59.5, cy: 117.5 },
  { cx: 108.5, cy: 108.5 },
  { cx: 120.5, cy: 94.5 },
  { cx: 138.5, cy: 113.5 },
  { cx: 125.5, cy: 129.5 },
  { cx: 115.5, cy: 117.5 },
]

const spiral = [
  { cx: 31.5, cy: 64.5 },
  { cx: 47.5, cy: 44.5 },
  { cx: 80.5, cy: 28.5 },
  { cx: 116.5, cy: 20.5 },
  { cx: 171.01, cy: 39.75 },
  { cx: 187.58, cy: 68.33 },
  { cx: 198.58, cy: 112.33 },
  { cx: 188.25, cy: 153.63 },
  { cx: 164.16, cy: 186.35 },
  { cx: 134.23, cy: 201.16 },
  { cx: 92.36, cy: 202.28 },
  { cx: 63.36, cy: 196.28 },
  { cx: 38.78, cy: 155.78 },
  { cx: 32.68, cy: 114.72 },
  { cx: 59.58, cy: 76.69 },
  { cx: 88.03, cy: 57.77 },
  { cx: 126.09, cy: 52.39 },
  { cx: 152.82, cy: 64.76 },
  { cx: 166.93, cy: 96.84 },
  { cx: 170.93, cy: 131.84 },
  { cx: 149.86, cy: 156.62 },
  { cx: 118.86, cy: 172.62 },
  { cx: 87.92, cy: 165.25 },
  { cx: 66.92, cy: 155.25 },
  { cx: 62.92, cy: 114.25 },
  { cx: 89.92, cy: 95.25 },
  { cx: 125.49, cy: 88.55 },
  { cx: 141.49, cy: 109.55 },
  { cx: 143.49, cy: 138.55 },
  { cx: 113.49, cy: 147.55 },
  { cx: 93.49, cy: 131.55 },
  { cx: 113.49, cy: 114.55 },
  { cx: 122.49, cy: 125.55 },
]

const zigzag = [
  { cx: 49.73, cy: 32.81 },
  { cx: 68.83, cy: 54.37 },
  { cx: 87.62, cy: 32.85 },
  { cx: 100.62, cy: 53.85 },
  { cx: 116.28, cy: 33.05 },
  { cx: 129.35, cy: 54.69 },
  { cx: 147.35, cy: 32.69 },
  { cx: 165.45, cy: 55.49 },
  { cx: 181.45, cy: 32.49 },
  { cx: 201.45, cy: 57.49 },
  { cx: 190.73, cy: 86.12 },
  { cx: 174.73, cy: 74.12 },
  { cx: 158.73, cy: 96.12 },
  { cx: 135.43, cy: 75.07 },
  { cx: 116.68, cy: 96.03 },
  { cx: 102.82, cy: 77.31 },
  { cx: 82.82, cy: 97.31 },
  { cx: 69.82, cy: 67.31 },
  { cx: 56.82, cy: 96.31 },
  { cx: 42.44, cy: 77.3 },
  { cx: 28.61, cy: 105.81 },
  { cx: 45.61, cy: 135.81 },
  { cx: 60.61, cy: 115.81 },
  { cx: 78, cy: 134.6 },
  { cx: 95.7, cy: 114.32 },
  { cx: 113.7, cy: 134.32 },
  { cx: 134.2, cy: 109.04 },
  { cx: 148.46, cy: 131.44 },
  { cx: 162.46, cy: 110.44 },
  { cx: 177.46, cy: 128.44 },
  { cx: 190.4, cy: 111.12 },
  { cx: 203.4, cy: 136.12 },
  { cx: 183.69, cy: 160.98 },
  { cx: 162.69, cy: 144.98 },
  { cx: 146.69, cy: 171.98 },
  { cx: 127.52, cy: 151.98 },
  { cx: 115.52, cy: 167.98 },
  { cx: 98.54, cy: 144.86 },
  { cx: 84.54, cy: 165.86 },
  { cx: 63.92, cy: 147.18 },
  { cx: 49.92, cy: 171.18 },
  { cx: 31.92, cy: 155.18 },
  { cx: 25.92, cy: 172.18 },
  { cx: 50.4, cy: 201.76 },
  { cx: 66.4, cy: 180.76 },
  { cx: 86.82, cy: 199.32 },
  { cx: 99.82, cy: 181.32 },
  { cx: 119.81, cy: 198.96 },
  { cx: 129.81, cy: 180.96 },
  { cx: 153.38, cy: 201.44 },
  { cx: 163.38, cy: 184.44 },
  { cx: 183.48, cy: 198.68 },
  { cx: 199.48, cy: 175.68 },
]

const shapes = [spiral, star, zigzag]

const Wrapper = Component.flex.ai_center.jc_center.article()
const Button = Component.w60.flex.c_pointer.fs14.absolute.r10.b10.div()
const Dot = Component.c_pointer.g()
