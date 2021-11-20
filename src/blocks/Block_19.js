import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_19 = ({ color }) => {
  const [touched, set_touched] = useState()
  const [wheelable, set_wheelable] = useState(true)
  const [wheeled, set_wheeled] = useState(0)
  const [text, set_text] = useState('scroll')

  useEffect(() => {
    document.body.style.overflow = wheelable ? 'hidden' : 'auto'
  }, [wheelable])

  const handle_wheel = (event, wheeling) => {
    const reached = { top: !wheeled, bottom: wheeled > 360 }

    const can_wheel =
      (wheeling.down && !reached.bottom) || (wheeling.up && !reached.top)
    set_wheelable(can_wheel)

    if (!can_wheel) return
    set_wheeled(wheeled + (wheeling.down > 0 ? 2 : -2))
  }

  return (
    <Wrapper
      onTouchStart={(event) => {
        set_wheelable(wheeled >= 0)
        set_touched(Math.round(event.touches[0].pageY))
      }}
      onTouchEnd={() => {
        set_wheelable(false)
        set_touched(false)
      }}
      onTouchMove={(event) => {
        const { pageY } = event.touches[0]
        const wheeling = { down: touched > pageY, up: touched < pageY }
        handle_wheel(event, wheeling)
      }}
      onMouseOver={() => set_wheelable(wheeled > 0)}
      onMouseEnter={() => set_wheelable(wheeled > 0)}
      onMouseLeave={() => set_wheelable(false)}
      onWheel={(event) => {
        const wheeling = { down: event.deltaY > 0, up: event.deltaY < 0 }
        handle_wheel(event, wheeling)
      }}
      onWheel={(event) => {
        const wheeling = { down: event.deltaY > 0, up: event.deltaY < 0 }
        const reached = { top: !wheeled, bottom: wheeled > 360 }

        const can_wheel =
          (wheeling.down && !reached.bottom) || (wheeling.up && !reached.top)
        set_wheelable(can_wheel)

        if (!can_wheel) return
        set_wheeled(wheeled + (event.deltaY > 0 ? 2 : -2))
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
const History = Component.zi1.w80p.h100p.absolute.div()
const Slides = Component.w100p.flex.ai_center.jc_center.h100p.absolute.div()
const Word = Component.fs12.flex.ai_center.jc_center.pa15.div()
const Text = Component.uppercase.f_invert100.fs12vw.fs80__xs.p()
