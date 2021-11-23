import { scroll_to } from './utils/toolbox'
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
export const Minus = (props) => <Icon path={paths.minus} {...props} />
export const Arrow = (props) => <Icon path={paths.arrow} {...props} />
export const Tags = (props) => <Icon path={paths.tags} {...props} />
export const Upsize = (props) => <Icon path={paths.upsize} {...props} />
export const Downsize = (props) => <Icon path={paths.downsize} {...props} />
export const ScrollDown = (props) => (
  <Icon path={paths.scroll_down} {...props} />
)

export const ScrollTo = ({ section }) => (
  <ScrollDown
    onClick={(event) => scroll_to(event, `section-${section + 2}`)}
    stroke="black"
    width={35}
    hidden__d
    absolute
    zi20
    b20
    r10
  />
)

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
  minus: 'M115 65H15',
  arrow: 'm72.85 17.6 47.65 47.65-47.65 47.65M5.5 65.25h114.34',
  tags: 'M42.24 38.04 10 65l32.24 26.96M87.75 91.96 120 65 87.75 38.04',
  upsize: 'M12 51V12h39M12 79v39h39M118 51V12H79M118 79v39H79',
  downsize: 'M39 0v39H0M39 130V91H0M91 0v39h39M91 130V91h39',
  scroll_down: 'm90 87.84-38 38-38-38M90 45 52 83 14 45M90 4.16l-38 38-38-38',
}

const Svg = Component.of_visible.svg()
