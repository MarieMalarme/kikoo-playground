import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_74 = ({ color }) => {
  const [corners_radius, set_corners_radius] = useState(4)
  const [circles_amount, set_circles_amount] = useState(20)
  const circles = [...Array(circles_amount).keys()]

  return (
    <Wrapper style={{ background: 'var(--orange7)' }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${svg_viewbox} ${svg_viewbox}`}
      >
        {circles.map((index) => (
          <rect
            key={index}
            x={svg_viewbox / 2 - svg_viewbox / 2}
            y={svg_viewbox / 2 - svg_viewbox / 2}
            rx={corners_radius}
            width={svg_viewbox}
            height={svg_viewbox}
            fill="none"
            stroke="var(--saffron5)"
            strokeWidth={0.75}
            style={{
              transformOrigin: 'center',
              transform: `rotate(${(index * 180) / circles_amount}deg)`,
            }}
          />
        ))}
      </Svg>

      <Controls l20>
        Squares
        <Input
          min={6}
          max={30}
          step={2}
          type="range"
          defaultValue={circles_amount}
          className="range-input-thin"
          onInput={(event) => set_circles_amount(Number(event.target.value))}
        />
      </Controls>
      <Controls r20>
        Corners
        <Input
          min={1}
          max={20}
          type="range"
          defaultValue={corners_radius}
          className="range-input-thin"
          onInput={(event) => set_corners_radius(event.target.value)}
        />
      </Controls>
    </Wrapper>
  )
}

const svg_viewbox = 100

const Wrapper = Component.flex.ai_center.jc_center.article()
const Controls =
  Component.f_invert100.fs14.absolute.b20.flex.flex_column.ai_center.div()
const Input = Component.w70.mt10.input()
const Svg = Component.of_visible.w50p.h50p.svg()
