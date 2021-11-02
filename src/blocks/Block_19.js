import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_19 = ({ color }) => {
  const [scrolled, set_scrolled] = useState(-20)
  const [text, set_text] = useState('scroll')

  return (
    <Wrapper
      onMouseOver={() => (document.body.style.overflow = 'hidden')}
      onMouseEnter={() => (document.body.style.overflow = 'hidden')}
      onMouseLeave={() => (document.body.style.overflow = 'auto')}
      onWheel={(event) => set_scrolled(scrolled + (event.deltaY > 0 ? 2 : -2))}
    >
      <Carousel text={text} set_text={set_text} scrolled={scrolled} />
      <Text>{text}</Text>
    </Wrapper>
  )
}

const Carousel = ({ scrolled, text, set_text }) => {
  const rotation = -scrolled
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
const History = Component.w80p.h100p.absolute.div()
const Slides = Component.w100p.flex.ai_center.jc_center.h100p.absolute.div()
const Word = Component.fs12.flex.ai_center.jc_center.pa15.div()
const Text = Component.uppercase.fs12vw.p()
