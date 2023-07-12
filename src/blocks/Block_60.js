import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_60 = ({ color }) => {
  const [radius, set_radius] = useState(20)
  const [circles_amount, set_circles_amount] = useState(20)
  const circles = [...Array(circles_amount).keys()]

  return (
    <Wrapper style={{ background: 'var(--cyan8)' }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${svg_viewbox} ${svg_viewbox}`}
      >
        {circles.map((index) => (
          <ellipse
            key={index}
            cx={svg_viewbox / 2}
            cy={svg_viewbox / 2}
            rx={radius}
            ry={svg_viewbox / 2}
            fill="none"
            stroke="var(--candy3)"
            strokeWidth={0.5}
            style={{
              transformOrigin: 'center',
              transform: `rotate(${(index * 180) / circles_amount}deg)`,
            }}
          />
        ))}
      </Svg>

      <Controls l20>
        Radius
        <Input
          min={5}
          max={svg_viewbox / 2 - 15}
          type="range"
          defaultValue={radius}
          className="range-input-thin"
          onInput={(event) => set_radius(event.target.value)}
        />
      </Controls>
      <Controls r20>
        Ellipses
        <Input
          min={5}
          max={30}
          type="range"
          defaultValue={circles_amount}
          className="range-input-thin"
          onInput={(event) => set_circles_amount(Number(event.target.value))}
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
const Svg = Component.of_visible.w65p.h65p.svg()
