import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_4 = ({ is_selected }) => {
  const [current_direction, set_current_direction] = useState('top-right')
  const [paused, set_paused] = useState(true)
  const [wrapper, set_wrapper] = useState(null)
  const [background_size, set_background_size] = useState(null)

  useEffect(() => {
    if (!wrapper) return
    const { width } = wrapper.getBoundingClientRect()
    set_background_size(`${Math.ceil((100 * width) / 2 / window.innerWidth)}vw`)
  }, [wrapper, current_direction])

  return (
    <Wrapper
      elemRef={set_wrapper}
      className={!paused && `disco-${current_direction}`}
      onMouseOver={() => set_paused(false)}
      onMouseEnter={() => set_paused(false)}
      onMouseLeave={() => set_paused(true)}
      style={{
        '--unit': background_size,
        backgroundImage: `radial-gradient(
        yellow 0%,
        white 49%,
        white 51%,
        cyan 100%)`,
        backgroundPosition: `${background_size} ${background_size}`,
      }}
    >
      <Half>
        <Corner
          direction="top-left"
          current_direction={current_direction}
          set_current_direction={set_current_direction}
        />
        <Corner
          direction="top-right"
          current_direction={current_direction}
          set_current_direction={set_current_direction}
        />
      </Half>
      <Eyes style={{ transform: `rotate(${rotations[current_direction]}deg)` }}>
        👀
      </Eyes>
      <Half>
        <Corner
          direction="bottom-left"
          current_direction={current_direction}
          set_current_direction={set_current_direction}
        />
        <Corner
          direction="bottom-right"
          current_direction={current_direction}
          set_current_direction={set_current_direction}
        />
      </Half>
    </Wrapper>
  )
}

const Corner = ({ direction, current_direction, set_current_direction }) => {
  const top = direction.includes('top')
  const left = direction.includes('left')

  return (
    <Quarter
      onMouseEnter={() => set_current_direction(direction)}
      style={{
        alignItems: top ? 'flex-start' : 'flex-end',
        justifyContent: left ? 'flex-start' : 'flex-end',
      }}
    >
      <Icon
        is_selected={current_direction === direction}
        rotation={rotations[direction]}
      />
    </Quarter>
  )
}

const Icon = ({ rotation, is_selected }) => (
  <svg
    style={{ transform: `rotate(${rotation + 180}deg)` }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 130 130"
    width="40px"
  >
    {is_selected ? Arrow : <circle cx={65.5} cy={65.5} r="15" />}
  </svg>
)

const Arrow = (
  <path
    fill="none"
    stroke="black"
    strokeWidth={10}
    d="m72.85 17.6 47.65 47.65-47.65 47.65M5.5 65.25h114.34"
  />
)

const rotations = {
  'top-right': 135,
  'top-left': 45,
  'bottom-right': -135,
  'bottom-left': -45,
}

const Wrapper = Component.flex.flex_column.jc_between.article()
const Half = Component.w100p.h100p.flex.div()
const Quarter = Component.pa30.flex.w50p.h100p.c_pointer.div()
const Eyes =
  Component.fs50.h100p.w100p.flex.jc_center.absolute.ai_center.events_none.div()
