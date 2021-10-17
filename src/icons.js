import { Component } from './utils/flags'

export const MouseWheel = (props) => {
  const { stroke, width, stroke_width, hovered, ...style } = props
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 170"
      width={width || 15}
      {...style}
    >
      <g
        fill="none"
        stroke={stroke || 'white'}
        strokeWidth={stroke_width || 5}
        strokeLinecap="round"
      >
        <path d="M42.5 94.75a17.5 17.5 0 0 1-35 0v-19.5a17.5 17.5 0 0 1 35 0Z" />
        <path d="M25 73v5" />
        <path
          className={`arrows-top ${hovered && 'to-top'}`}
          d="m15.5 21.05 9.5-9.5 9.5 9.5M15.5 36.59l9.5-9.5 9.5 9.5M34.5"
        />
        <path
          className={`arrows-bottom ${hovered && 'to-bottom'}`}
          d="m34.5 148.95l-9.5 9.5-9.5-9.5M34.5 133.41l-9.5 9.5-9.5-9.5"
        />
      </g>
    </Svg>
  )
}

const Svg = Component.of_visible.svg()
