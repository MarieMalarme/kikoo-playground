import { useState, useEffect, Fragment } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_6 = ({ hovered }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [hits, set_hits] = useState([])

  useEffect(() => {
    if (!wrapper) return

    const handle_keydown = (event) => {
      if (!hovered) return
      if (event.key === 'Backspace') set_hits([])
      if (event.key !== 'b') return
      const new_hit = generate_hit(wrapper)
      set_hits([...hits, new_hit])
    }

    document.addEventListener('keydown', handle_keydown)
    return () => document.removeEventListener('keydown', handle_keydown)
  }, [wrapper, hits, hovered])

  return (
    <Wrapper
      onTouchStart={() => {
        const new_hit = generate_hit(wrapper)
        set_hits([...hits, new_hit])
      }}
      elemRef={set_wrapper}
    >
      {hits.map((hit, index) => {
        const { text, font_size, top, left, rotation } = hit
        return (
          <Hit
            key={index}
            style={{
              top,
              left,
              fontSize: font_size,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {text}
          </Hit>
        )
      })}
      {!hits.length && (
        <Fragment>
          <Instruction hidden__xs>Press B for long to write</Instruction>
          <Instruction hidden__d block__xs>
            Tap to write
          </Instruction>
          <Instruction hidden__xs>Hit Backspace to delete</Instruction>
        </Fragment>
      )}
    </Wrapper>
  )
}

const generate_hit = (wrapper) => {
  const { width, height } = wrapper.getBoundingClientRect()

  return {
    text: texts[random(0, texts.length - 1)],
    font_size: random(30, 120),
    top: random(-30, height - 30),
    left: random(-30, width - 30),
    rotation: random(-45, 45),
  }
}

const texts = ['bim', 'bam', 'boom']
const Wrapper = Component.pa30.flex.flex_column.ai_center.jc_between.article()
const Hit = Component.white.absolute.blend_exclusion.p()
const Instruction = Component.text_center.zi1.mv5.ba.pv10.ph15.div()
