import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_23 = ({ color }) => {
  const [touched, set_touched] = useState()
  const [wheelable, set_wheelable] = useState(true)
  const [wrapper, set_wrapper] = useState(null)
  const [inc, set_inc] = useState(0)

  const handle_wheel = (wheeling) => {
    const reached = { top: inc < -1580, bottom: inc > 2890 }

    const can_wheel =
      (wheeling.down && !reached.bottom) || (wheeling.up && !reached.top)
    set_wheelable(can_wheel)

    if (!can_wheel) return
    set_inc(wheeling.up ? inc - 5 : inc + 5)
  }

  useEffect(() => {
    document.body.style.overflow = wheelable ? 'hidden' : 'auto'
  }, [wheelable])

  return (
    <Wrapper
      elemRef={set_wrapper}
      onMouseOver={() => set_wheelable(inc > 0)}
      onMouseEnter={() => set_wheelable(inc > 0)}
      onMouseLeave={() => set_wheelable(false)}
      onWheel={(event) => {
        const wheeling = { down: event.deltaY > 0, up: event.deltaY < 0 }
        handle_wheel(wheeling)
      }}
      onTouchStart={(event) => {
        set_wheelable(inc > 0)
        set_touched(event.touches[0].pageY)
      }}
      onTouchEnd={() => {
        set_wheelable(false)
        set_touched()
      }}
      onTouchMove={(event) => {
        const { pageY } = event.touches[0]
        const wheeling = { down: touched > pageY, up: touched < pageY }
        handle_wheel(wheeling)
      }}
    >
      <Curve
        height={wrapper?.getBoundingClientRect().height - 100 || 0}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 368"
      >
        <defs>
          <path
            stroke="black"
            id="block-23-curve-1"
            d="M0 367.73V89.24C0 40.11 37.21.27 83.11.27s83.11 39.84 83.11 89v189.49c0 49.13 37.2 89 83.1 89h1.36c45.9 0 83.1-39.84 83.1-89V89.24c0-49.13 37.21-89 83.11-89S500 40.08 500 89.24v189.52c0 49.13 37.21 89 83.11 89s83.11-39.84 83.11-89V89.24c0-49.13 37.2-89 83.1-89h1.36c45.9 0 83.1 39.84 83.1 89v189.52c0 49.13 37.21 89 83.11 89s83.11-39.84 83.11-89V.27"
          />
        </defs>
        <Text textAnchor="middle" fill={color.value}>
          <textPath
            startOffset={inc}
            alignmentBaseline="middle"
            xlinkHref="#block-23-curve-1"
          >
            ✽ Une vache qui pisse dans un tonneau c'est rigolo mais c'est salaud
            ✽
          </textPath>
        </Text>
      </Curve>
    </Wrapper>
  )
}

const Wrapper = Component.flex.ai_center.jc_center.article()
const Curve = Component.absolute.t50.l50.f_invert100.of_visible.svg()
const Text = Component.fs80.ls10.text()
