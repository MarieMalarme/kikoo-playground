import { useState, useEffect, useRef } from 'react'
import { Component } from '../utils/flags'
import * as PIXI from 'pixi.js'
import { Stage, Sprite, Container, withFilters } from '@inlet/react-pixi'

import sprite from '../images/sprite.png'
import displacement_map from '../images/displacement-1.jpg'

export const Block_53 = ({ is_selected, hovered, color }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [mouse, set_mouse] = useState({ x: 100, y: 100 })

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const { width, height } = wrapper.getBoundingClientRect()
    // translate the mouse position in the page to the coordinate system of the block
    const translator_x = width / 2 + wrapper.offsetParent.offsetLeft
    const translator_y = height / 2 + wrapper.offsetParent.offsetTop
    const x = event.pageX - translator_x
    const y = event.pageY - translator_y
    set_mouse({ x, y })
  }

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  return (
    <Wrapper
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
      elemRef={set_wrapper}
    >
      <Stage>
        <DisplacementMap
          mouse={mouse}
          width={wrapper?.getBoundingClientRect().width}
        />
      </Stage>
    </Wrapper>
  )
}

const DisplacementMap = ({ mouse, width }) => {
  const filter_ref = useRef()
  const [render_filter, set_render_filter] = useState(false)

  useEffect(() => {
    filter_ref.current.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    set_render_filter(true)
  }, [])

  return (
    <>
      {/* displacement map image */}
      <Sprite
        anchor={0.25}
        x={mouse.x}
        y={mouse.y}
        width={width * 2}
        height={width * 2}
        image={displacement_map}
        ref={filter_ref}
      />

      {render_filter && (
        <Filters
          displacement={{
            construct: [filter_ref.current],
            scale: { x: 100, y: 100 },
          }}
        >
          {/* base image to deform */}
          <Sprite
            y={-12}
            width={width + 50}
            height={width + 50}
            image={sprite}
          />
        </Filters>
      )}
    </>
  )
}

const Filters = withFilters(Container, {
  displacement: PIXI.filters.DisplacementFilter,
})

const Wrapper = Component.flex.flex_wrap.article()
