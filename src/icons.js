import { Component } from './utils/flags'

const Icon = ({ path, ...props }) => {
  const { rotation, width, stroke, stroke_width, fill, ...style } = props

  return (
    <Svg
      style={{ transform: `rotate(${rotation || 0}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 130"
      width={width || 18}
      {...style}
    >
      <path
        fill={fill || 'none'}
        stroke={stroke || 'var(--grey5)'}
        strokeWidth={stroke_width || 10}
        d={path}
      />
    </Svg>
  )
}

export const Plus = (props) => <Icon path={paths.plus} {...props} />
export const Arrow = (props) => <Icon path={paths.arrow} {...props} />

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
        <path
          className={`arrows-top ${hovered && 'to-top'}`}
          d="m15.5 21.05 9.5-9.5 9.5 9.5M15.5 36.59l9.5-9.5 9.5 9.5M34.5 34.5"
        />
        <path d="M42.5 94.75a17.5 17.5 0 0 1-35 0v-19.5a17.5 17.5 0 0 1 35 0Z M25 73v5" />
        <path
          className={`arrows-bottom ${hovered && 'to-bottom'}`}
          d="m34.5 148.95l-9.5 9.5-9.5-9.5M34.5 133.41l-9.5 9.5-9.5-9.5"
        />
      </g>
    </Svg>
  )
}

const paths = {
  plus: 'M65 15v100M115 65H15',
  arrow: 'm72.85 17.6 47.65 47.65-47.65 47.65M5.5 65.25h114.34',
}

const Svg = Component.of_visible.svg()
