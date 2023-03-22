import { useState, useEffect, useRef } from 'react'
import { Component } from '../utils/flags'
import { MouseWheel } from '../icons'

export const Block_7 = ({ color, is_hovered }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [current_circles, set_current_circles] = useState(1)
  const [wheeled, set_wheeled] = useState(base_radius)
  const [wheelable, _set_wheelable] = useState(false)
  const [touched, set_touched] = useState(false)

  const wheelable_ref = useRef(wheelable)
  const set_wheelable = (data) => {
    wheelable_ref.current = data
    _set_wheelable(data)
  }

  const update_wheeled = (wheeling, touchevent) => {
    const reached = { top: wheeled <= base_radius, bottom: wheeled > 175 }

    const can_wheel =
      is_hovered &&
      ((wheeling.down && !reached.bottom) || (wheeling.up && !reached.top))
    set_wheelable(can_wheel)

    if (!can_wheel) return
    const increment = touchevent ? 2 : 1
    set_wheeled(wheeling.up ? wheeled - increment : wheeled + increment)
    const circles = Number(Math.floor(wheeled / base_radius).toFixed())
    if (circles !== current_circles) set_current_circles(circles)
  }

  useEffect(() => {
    const prevent_scroll = (event) => {
      if (!wheelable_ref.current) return
      event.preventDefault()
    }

    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper, wheelable_ref])

  useEffect(() => {
    const media_query_xs = window.matchMedia('(max-width: 600px)')
    document.body.style.overflow =
      wheelable || media_query_xs.matches ? 'hidden' : 'auto'
  }, [wheelable])

  useEffect(() => {
    if (!wrapper) return
    document.addEventListener('touchstart', (event) => {
      !event.target.contains(wrapper) && set_wheelable(false)
    })
  }, [wrapper])

  return (
    <Wrapper
      elemRef={set_wrapper}
      onTouchStart={(event) => set_touched(event.touches[0].pageY)}
      onTouchEnd={() => set_touched(false)}
      onTouchMove={(event) => {
        const { pageY } = event.touches[0]
        const wheeling = { down: touched > pageY, up: touched < pageY }
        update_wheeled(wheeling, true)
      }}
      onMouseOver={() => set_wheelable(wheeled > base_radius)}
      onMouseEnter={() => set_wheelable(wheeled >= base_radius)}
      onMouseLeave={() => set_wheelable(false)}
      onWheel={(event) => {
        const wheeling = { down: event.deltaY > 0, up: event.deltaY < 0 }
        update_wheeled(wheeling)
      }}
    >
      <Svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
        {[...Array(current_circles).keys()].map((index) => (
          <Circle
            key={index}
            index={index}
            wheeled={wheeled}
            base_radius={base_radius}
            color={color.value}
          />
        ))}
      </Svg>
      <MouseWheel is_hovered={is_hovered} absolute height="15%" />
    </Wrapper>
  )
}

const Circle = ({ wheeled, base_radius, index, color }) => (
  <circle
    cx={65}
    cy={65}
    fill={color}
    r={wheeled - base_radius * index}
    style={{ filter: !(index % 2) && 'invert(1)' }}
  />
)

const base_radius = 20
const Wrapper = Component.flex.ai_center.jc_center.article()
const Svg = Component.w100p.h100p.events_none.svg()
