import { useState, useEffect, useRef } from 'react'
import { Component } from '../utils/flags'
import { MouseWheel } from '../icons'
import dog1 from '../images/dog-1.png'
import dog2 from '../images/dog-2.png'

export const Block_56 = ({ hovered }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [touched, set_touched] = useState()
  const [wheelable, _set_wheelable] = useState(false)
  const [wheeled, set_wheeled] = useState(0)

  const wheelable_ref = useRef(wheelable)
  const set_wheelable = (data) => {
    wheelable_ref.current = data
    _set_wheelable(data)
  }

  const handle_wheel = (wheeling) => {
    const can_wheel = hovered
    set_wheelable(can_wheel)
    if (!can_wheel) return
    const increment = 8
    set_wheeled(wheeled + (wheeling.down > 0 ? increment : -increment))
  }

  useEffect(() => {
    document.body.style.overflow = wheelable ? 'hidden' : 'auto'
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
    document.body.style.overflow = wheelable ? 'hidden' : 'auto'
  }, [wheelable])

  useEffect(() => {
    if (!wrapper) return
    document.addEventListener('touchstart', (event) => {
      !event.target.contains(wrapper) && set_wheelable(false)
    })
  }, [wrapper])

  return (
    <Wrapper
      style={{
        perspective: '750px',
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
      elemRef={set_wrapper}
      onTouchStart={(event) => set_touched(event.touches[0].pageY)}
      onTouchEnd={() => set_touched(false)}
      onTouchMove={(event) => {
        const { pageY } = event.touches[0]
        const wheeling = { down: touched > pageY, up: touched < pageY }
        handle_wheel(wheeling, true)
      }}
      onMouseOver={() => set_wheelable(wheeled > 0)}
      onMouseEnter={() => set_wheelable(wheeled > 0)}
      onMouseLeave={() => set_wheelable(false)}
      onWheel={(event) => {
        const wheeling = { down: event.deltaY > 0, up: event.deltaY < 0 }
        handle_wheel(wheeling)
      }}
    >
      <MouseWheel absolute t20 l20 hovered={hovered} />
      <Image
        style={{
          background: `center / contain no-repeat url(${dog1})`,
          transform: `rotateY(${wheeled}deg)`,
          backfaceVisibility: 'hidden',
        }}
      />
      <Image
        style={{
          background: `center / contain no-repeat url(${dog2})`,
          transform: `rotateY(${180 + wheeled}deg)`,
          backfaceVisibility: 'hidden',
        }}
      />
    </Wrapper>
  )
}

const Wrapper = Component.flex.ai_center.jc_center.article()
const Image = Component.w85p.h85p.absolute.div()
