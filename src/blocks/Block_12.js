import { useState, useEffect, useRef } from 'react'
import { Component } from '../utils/flags'
import { MouseWheel } from '../icons'

export const Block_12 = ({ color, is_selected, is_hovered }) => {
  const [touched, set_touched] = useState()
  const [wrapper, set_wrapper] = useState(null)
  const [ref, set_ref] = useState(null)
  const [wheeled, set_wheeled] = useState(0)
  const [wheelable, _set_wheelable] = useState(false)

  const wheelable_ref = useRef(wheelable)
  const set_wheelable = (data) => {
    wheelable_ref.current = data
    _set_wheelable(data)
  }

  const handle_wheel = (wheeling, touchevent) => {
    const { width } = ref.getBoundingClientRect()
    const reached = { top: !wheeled, bottom: wheeled > width / 8 }

    const can_wheel =
      is_hovered &&
      ((wheeling.down && !reached.bottom) || (wheeling.up && !reached.top))
    set_wheelable(can_wheel)

    if (!can_wheel) return
    const increment = touchevent ? 20 : 1
    set_wheeled(wheeled + (wheeling.up ? -increment : increment))
  }

  useEffect(() => {
    const { matches } = window.matchMedia('(max-width: 600px)')
    document.body.style.overflow = wheelable || matches ? 'hidden' : 'auto'
  }, [wheelable])

  useEffect(() => {
    const prevent_scroll = (event) => {
      if (!wheelable_ref.current) return
      event.preventDefault()
    }

    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper, wheelable_ref])

  useEffect(() => {
    if (!wrapper) return
    document.addEventListener('touchstart', (event) => {
      !event.target.contains(wrapper) && set_wheelable(false)
    })
  }, [wrapper])

  return (
    <Wrapper
      elemRef={set_wrapper}
      onMouseOver={() => set_wheelable(wheeled > 0)}
      onMouseEnter={() => set_wheelable(wheeled > 0)}
      onMouseLeave={() => set_wheelable(false)}
      onWheel={(event) => {
        const wheeling = { down: event.deltaY > 0, up: event.deltaY < 0 }
        handle_wheel(wheeling)
      }}
      onTouchStart={(event) => set_touched(event.touches[0].pageY)}
      onTouchEnd={() => set_touched(false)}
      onTouchMove={(event) => {
        const { pageY } = event.touches[0]
        const wheeling = { down: touched > pageY, up: touched < pageY }
        handle_wheel(wheeling)
      }}
    >
      {!wheeled && (
        <Instruction t80={is_selected} r80={is_selected}>
          <MouseWheel
            width={is_selected ? 45 : 30}
            is_hovered={is_hovered}
            stroke_width={5}
          />
        </Instruction>
      )}

      {texts.map(({ text, translate, is_quote }) => {
        const ref = is_quote && { elemRef: set_ref }
        return (
          <Text
            {...ref}
            key={text}
            fs9vw={is_selected}
            lh10vw={is_selected}
            className="block-12 text"
            style={{
              transform: `translate${translate(wheeled)}`,
              color: is_quote ? `hsl(${color.hue + 180}, 80%, 60%)` : 'black',
            }}
          >
            {text}
          </Text>
        )
      })}
    </Wrapper>
  )
}

const texts = [
  { text: 'Linus', translate: (value) => `Y(${-value}px)` },
  { text: 'Torvalds', translate: (value) => `(${value}px, ${-value}px)` },
  {
    text: 'Talk is cheap, show me the code.',
    translate: (value) => `X(${-value * 5}px)`,
    is_quote: true,
  },
  { text: 'Fri, 25', translate: (value) => `(${value}px, ${value}px)` },
  { text: 'Aug 2000', translate: (value) => `Y(${value}px)` },
]

const Wrapper = Component.flex.flex_wrap.flex_column.h100p.jc_center.article()
const Instruction = Component.absolute.r30.t30.div()
const Text =
  Component.events_none.sans.fs4vw.black.ws_nowrap.fs60.flex.pl30.ai_center.p()
