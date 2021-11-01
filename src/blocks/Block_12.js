import { useState } from 'react'
import { Component } from '../utils/flags'
import { MouseWheel } from '../icons'

export const Block_12 = ({ color, ...props }) => {
  const [ref, set_ref] = useState(null)
  const [wheeled, set_wheeled] = useState(0)
  const [reached, set_reached] = useState(false)
  const [hovered, set_hovered] = useState(false)

  const handle_wheel = (event) => {
    if (wheeled <= 0 && event.deltaY < 0) return
    wheeled > ref.getBoundingClientRect().width / 8 && set_reached(true)
    wheeled <= 0 && set_reached(false)
    const backwards = event.deltaY < 0 || reached
    set_wheeled(wheeled + (backwards ? -1 : 1))
  }

  return (
    <Wrapper
      {...props}
      onMouseEnter={() => {
        set_hovered(true)
        document.body.style.overflow = 'hidden'
      }}
      onMouseLeave={() => {
        set_hovered(false)
        document.body.style.overflow = 'auto'
      }}
      onWheel={handle_wheel}
    >
      {!wheeled && (
        <Instruction>
          <MouseWheel hovered={hovered} stroke_width={6} />
        </Instruction>
      )}

      <Text style={{ transform: `translateY(${-wheeled}px)` }}>Linus</Text>
      <Text style={{ transform: `translate(${wheeled}px, ${-wheeled}px)` }}>
        Torvalds
      </Text>
      <Text
        elemRef={set_ref}
        style={{
          color: `hsl(${color.hue + 180}, 80%, 60%)`,
          transform: `translateX(${-wheeled * 5}px)`,
        }}
      >
        Talk is cheap, show me the code.
      </Text>
      <Text style={{ transform: `translate(${wheeled}px, ${wheeled}px)` }}>
        Fri, 25
      </Text>
      <Text style={{ transform: `translateY(${wheeled}px)` }}>Aug 2000</Text>
    </Wrapper>
  )
}

const Wrapper = Component.flex.flex_wrap.flex_column.h100p.jc_center.article()
const Instruction = Component.absolute.r20.t20.div()
const Text =
  Component.sans.lh35.fs4vw.black.ws_nowrap.fs60.flex.pl30.ai_center.p()
