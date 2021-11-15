import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { MouseWheel } from '../icons'

export const Block_12 = ({ color, is_selected, hovered }) => {
  const [ref, set_ref] = useState(null)
  const [wheeled, set_wheeled] = useState(0)
  const [wheelable, set_wheelable] = useState(true)

  const handle_wheel = (event) => {
    const { width } = ref.getBoundingClientRect()

    const wheeling = { down: event.deltaY > 0, up: event.deltaY < 0 }
    const reached = { top: !wheeled, bottom: wheeled > width / 8 }

    const can_wheel =
      (wheeling.down && !reached.bottom) || (wheeling.up && !reached.top)
    set_wheelable(can_wheel)

    if (!can_wheel) return
    set_wheeled(wheeled + (wheeling.up ? -1 : 1))
  }

  useEffect(() => {
    document.body.style.overflow = wheelable ? 'hidden' : 'auto'
  }, [wheelable])

  return (
    <Wrapper
      onMouseOver={() => set_wheelable(wheeled > 0)}
      onMouseEnter={() => set_wheelable(wheeled > 0)}
      onMouseLeave={() => set_wheelable(false)}
      onWheel={handle_wheel}
    >
      {!wheeled && (
        <Instruction t80={is_selected} r80={is_selected}>
          <MouseWheel
            width={is_selected ? 45 : 30}
            hovered={hovered}
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
const Text = Component.sans.fs4vw.black.ws_nowrap.fs60.flex.pl30.ai_center.p()
