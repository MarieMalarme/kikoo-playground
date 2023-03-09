import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_52 = ({ color }) => {
  const [mouse, set_mouse] = useState({ x: 100, y: 100 })
  const [circles, set_circles] = useState([{ x: 100, y: 100, id: 1 }])
  const [wrapper, set_wrapper] = useState(null)
  const [has_clicked, set_has_clicked] = useState(false)

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    // translate the mouse position in the page to the coordinate system of the block
    const translator_x = wrapper.offsetParent.offsetLeft
    const translator_y = wrapper.offsetParent.offsetTop
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
      elemRef={set_wrapper}
      onTouchMove={update_mouse}
      onMouseMove={update_mouse}
      onClick={() => {
        !has_clicked && set_has_clicked(true)

        const last_active_circle = circles.pop()
        const new_circle = { id: last_active_circle.id + 1 }
        set_circles([
          ...circles,
          {
            ...last_active_circle,
            x: mouse.x - inactive_radius,
            y: mouse.y - inactive_radius,
          },
          new_circle,
        ])
      }}
    >
      <Box>{!has_clicked && 'Move & click'}</Box>
      {circles.map((circle) => (
        <Circle
          key={circle.id}
          circles={circles}
          circle={circle}
          mouse={mouse}
        />
      ))}
    </Wrapper>
  )
}

const Circle = ({ mouse, circle, circles }) => {
  const { id, x, y } = circle
  const is_active = id === circles.length
  const left = is_active ? mouse.x - active_radius : x
  const top = is_active ? mouse.y - active_radius : y
  const size = is_active ? active_radius * 2 : inactive_radius * 2
  const background = is_active
    ? 'radial-gradient(white, transparent 70%)'
    : 'white'

  return (
    <Dot
      className={is_active ? 'circle-pop' : ''}
      style={{ background, left, top, width: `${size}px`, height: `${size}px` }}
    />
  )
}

const active_radius = 40
const inactive_radius = 15

const Wrapper = Component.flex.ai_center.jc_center.article()
const Box =
  Component.fs22.b_rad50p.flex.ai_center.jc_center.w55p.h55p.bg_white.blend_difference.div()
const Dot = Component.b_rad50p.blend_difference.bg_white.absolute.div()
