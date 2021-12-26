import { useState, useEffect } from 'react'
import { random } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_31 = ({ color }) => {
  const [mouse, set_mouse] = useState({ x: 0, y: 0 })
  const [wrapper, set_wrapper] = useState(null)
  const [{ width, height }, set_dimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!wrapper) return
    set_dimensions(wrapper.getBoundingClientRect())
    set_mouse({
      x: random(limit, width - limit),
      y: random(limit, height - limit),
    })

    const resizeObserver = new ResizeObserver(() => {
      set_dimensions(wrapper.getBoundingClientRect())
      set_mouse({
        x: random(limit, width - limit),
        y: random(limit, height - limit),
      })
    })
    resizeObserver.observe(wrapper)
    return () => resizeObserver.disconnect()
  }, [wrapper, height, width])

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const { offsetTop, offsetLeft } = wrapper.offsetParent
    const client_x = event.clientX - offsetLeft
    const client_y = event.clientY - (offsetTop - window.pageYOffset)

    const allowed_x = client_x > limit && width - client_x > limit
    const allowed_y = client_y > limit && height - client_y > limit

    if (allowed_x && allowed_y) set_mouse({ x: client_x, y: client_y })
    if (allowed_x && !allowed_y) set_mouse({ ...mouse, x: client_x })
    if (allowed_y && !allowed_x) set_mouse({ ...mouse, y: client_y })
  }

  return (
    <Wrapper
      elemRef={set_wrapper}
      onMouseMove={update_mouse}
      onTouchMove={update_mouse}
    >
      {paths.map((path, index) => (
        <Chunk
          key={index}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 960 550"
          fill={color.value}
          b0={index >= 2}
          t0={index <= 1}
          r0={index % 2}
          l0={!(index % 2)}
          width={Math.abs(index % 2 ? width - mouse.x : mouse.x)}
          height={Math.abs(index <= 1 ? mouse.y : height - mouse.y)}
        >
          <path d={path} />
        </Chunk>
      ))}
    </Wrapper>
  )
}

const paths = [
  'M125 495.28q-48.07-27.7-70-82.42T33 275q0-83.16 22-137.86t70-82.42Q173.08 27 250.85 27t125.86 27.72q48.06 27.72 70 82.42t22 137.86q0 83.16-22 137.86t-70 82.42Q328.64 523 250.85 523T125 495.28ZM594.29 495.28q-48.06-27.7-70-82.42t-22-137.86q0-83.16 22-137.86t70-82.42Q642.37 27 720.14 27T846 54.72q48.06 27.72 70 82.42T938 275q0 83.16-22 137.86t-70 82.42Q797.93 523 720.14 523t-125.85-27.72Z',
  'M125 495.28q-48.07-27.7-70-82.42T33 275q0-83.16 22-137.86t70-82.42Q173.08 27 250.85 27t125.86 27.72q48.06 27.72 70 82.42t22 137.86q0 83.16-22 137.86t-70 82.42Q328.64 523 250.85 523T125 495.28ZM594.29 495.28q-48.06-27.7-70-82.42t-22-137.86q0-83.16 22-137.86t70-82.42Q642.37 27 720.14 27T846 54.72q48.06 27.72 70 82.42T938 275q0 83.16-22 137.86t-70 82.42Q797.93 523 720.14 523t-125.85-27.72Z',
  'M125 495.28q-48.07-27.7-70-82.42T33 275q0-83.16 22-137.86t70-82.42Q173.08 27 250.85 27t125.86 27.72q48.06 27.72 70 82.42t22 137.86q0 83.16-22 137.86t-70 82.42Q328.64 523 250.85 523T125 495.28ZM594.29 495.28q-48.06-27.7-70-82.42t-22-137.86q0-83.16 22-137.86t70-82.42Q642.37 27 720.14 27T846 54.72q48.06 27.72 70 82.42T938 275q0 83.16-22 137.86t-70 82.42Q797.93 523 720.14 523t-125.85-27.72Z',
  'M125 495.28q-48.07-27.7-70-82.42T33 275q0-83.16 22-137.86t70-82.42Q173.08 27 250.85 27t125.86 27.72q48.06 27.72 70 82.42t22 137.86q0 83.16-22 137.86t-70 82.42Q328.64 523 250.85 523T125 495.28ZM594.29 495.28q-48.06-27.7-70-82.42t-22-137.86q0-83.16 22-137.86t70-82.42Q642.37 27 720.14 27T846 54.72q48.06 27.72 70 82.42T938 275q0 83.16-22 137.86t-70 82.42Q797.93 523 720.14 523t-125.85-27.72Z',
]

const limit = 50

const Wrapper = Component.flex.flex_wrap.article()
const Chunk = Component.f_invert100.svg()
