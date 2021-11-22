import { useState, useEffect, useRef } from 'react'
import { Component } from '../utils/flags'

export const Block_19 = ({ color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [touched, set_touched] = useState()
  const [wheelable, _set_wheelable] = useState(false)
  const [wheeled, set_wheeled] = useState(0)
  const [text, set_text] = useState('scroll')

  const wheelable_ref = useRef(wheelable)
  const set_wheelable = (data) => {
    wheelable_ref.current = data
    _set_wheelable(data)
  }

  const handle_wheel = (wheeling, touchevent) => {
    const reached = { top: !wheeled, bottom: wheeled > 360 }

    const can_wheel =
      (wheeling.down && !reached.bottom) || (wheeling.up && !reached.top)
    set_wheelable(can_wheel)

    if (!can_wheel) return
    const increment = touchevent ? 4 : 2
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
      <Carousel text={text} set_text={set_text} wheeled={wheeled} />
      <Text style={{ color: color.value }}>{text}</Text>
    </Wrapper>
  )
}

const Carousel = ({ wheeled, text, set_text }) => {
  const rotation = -wheeled
  const transform = `rotateX(${rotation}deg)`

  return (
    <History style={{ perspective: '400px' }}>
      <Slides style={{ transformStyle: 'preserve-3d', transform }}>
        {slides.map((slide, index) => (
          <Slide
            index={index}
            slide={slide}
            text={text}
            set_text={set_text}
            key={`carousel-slide-${index}`}
            rx_carousel={Math.abs(rotation)}
          />
        ))}
      </Slides>
    </History>
  )
}

const Slide = ({ index, rx_carousel, slide, set_text, text }) => {
  const rx = (360 * index) / slides.length
  const tz = Math.floor(slide_height / 2 / Math.tan(Math.PI / slides.length))

  const revolutions = Math.floor(rx_carousel / 360)
  const rx_without_revolutions = rx_carousel - 360 * revolutions

  const in_view_min = Math.abs(rx_without_revolutions > rx - angle_offset)
  const in_view_max = Math.abs(rx_without_revolutions < rx + angle_offset)
  const in_view = in_view_min && in_view_max

  useEffect(() => {
    if (in_view && text !== slide) set_text(slide)
  })

  return (
    <Word
      style={{
        width: slide_height,
        height: slide_height,
        border: 'solid 1px rgb(255, 255, 0)',
        color: in_view ? 'rgb(255, 255, 0)' : 'black',
        background: in_view ? 'transparent' : 'rgb(255, 255, 0)',
        transform: `rotateX(${rx}deg) translateZ(${tz}px)`,
      }}
    >
      {slide}
    </Word>
  )
}

const slides = [`un`, `deux`, `trois`, `quatre`, `cinq`, `six`, `sept`, `huit`]

const slide_height = 500 / Math.log(window.innerWidth)
const angle_offset = 160 / slides.length

const Wrapper = Component.flex.ai_center.jc_center.article()
const History = Component.events_none.zi1.w80p.h100p.absolute.div()
const Slides = Component.w100p.flex.ai_center.jc_center.h100p.absolute.div()
const Word = Component.fs12.flex.ai_center.jc_center.pa15.div()
const Text = Component.events_none.uppercase.f_invert100.fs12vw.fs80__xs.p()
