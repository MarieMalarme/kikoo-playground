import { useState, useEffect } from 'react'
import { random } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_43 = () => {
  const [mouse, set_mouse] = useState({ x: 0, y: 0 })
  const [wrapper, set_wrapper] = useState(null)
  const [{ width, height }, set_dimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!wrapper) return

    const set = () => {
      const dimensions = wrapper.getBoundingClientRect()
      set_dimensions(dimensions)
      set_mouse({
        x: random(limit, dimensions.width - limit),
        y: random(limit, dimensions.height - limit),
      })
    }

    set()

    const resizeObserver = new ResizeObserver(set)
    resizeObserver.observe(wrapper)
    return () => resizeObserver.disconnect()
  }, [wrapper])

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
      style={{ background: 'springgreen' }}
    >
      {paths.map((path, index) => (
        <Chunk
          key={index}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 960 550"
          fill="plum"
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
  'M142.24 1096.47V986.82h-28V822.35H86.33V603.06h-28v-219.3h-28V219.29h-28V0h84v219.29h28v219.3h28v164.47h28v219.29h28V603.06h28V438.59h28v-219.3h28V0h83.57v219.29h28v219.3h28v164.47h27.95v219.29h28V603.06h28V438.59h28v-219.3h28V0h83.88v219.29h-28v164.47h-28v219.3h-28v219.29h-28v164.47h-28v109.65h-83.91V986.82h-28V822.35h-28V603.06h-28v-219.3H310v219.3h-28v219.29h-28v164.47h-28v109.65ZM871.76 1096.47v-54.82h-83.87v-54.83h-28V932H732v-54.82h-28V767.53h-28V328.94h28V219.29h28v-54.82h28v-54.82h28V54.82h83.87V0h139.79v54.82h83.87v54.83h28v54.82h27.95v54.82h28v109.65h28v438.59h-28v109.65h-28V932h-27.95v54.82h-28v54.83h-83.87v54.82ZM983.59 932v-54.82h55.91v-54.83h28v-54.82h28V657.88h28V438.59h-28V328.94h-28v-54.82h-28v-54.83h-55.91v-54.82h-83.87v54.82H843.8v54.83h-28v54.82h-28v109.65h-28v219.29h28v109.65h28v54.82h28v54.83h55.92V932Z',
  'M-88.24 1096.47v-54.82h-83.87v-54.83h-28V932h-28v-54.82h-28V767.53h-27.95V328.94H-256V219.29h28v-54.82h28v-54.82h28V54.82h83.87V0H51.55v54.82h83.87v54.83h28v54.82h28v54.82h28v109.65h28v438.59h-28v109.65h-28V932h-28v54.82h-28v54.83H51.55v54.82ZM23.59 932v-54.82H79.5v-54.83h28v-54.82h28V657.88h28V438.59h-28V328.94h-28v-54.82h-28v-54.83H23.59v-54.82h-83.87v54.82h-55.92v54.83h-28v54.82h-28v109.65h-28v219.29h28v109.65h28v54.82h28v54.83h55.92V932ZM454.31 1096.47V986.82h-28V822.35h-28V603.06h-28v-219.3h-28V219.29h-28V0h84.09v219.29h28v219.3h28v164.47h28v219.29h28V603.06h27.95V438.59h28v-219.3h28V0H678v219.29h28v219.3h28v164.47h28v219.29h28V603.06h28V438.59h28v-219.3h27.95V0h83.88v219.29h-28v164.47h-28v219.3h-28v219.29h-28.11v164.47h-28v109.65h-83.83V986.82h-28V822.35H678V603.06h-28v-219.3h-28v219.3h-28v219.29h-28v164.47h-28v109.65Z',
  'M142.24 546.47V436.82h-28V272.35H86.33V53.06h-28v-219.3h-28v-164.47h-28V-550h84v219.29h28v219.3h28V53.06h28v219.29h28V53.06h28v-164.47h28v-219.3h28V-550h83.57v219.29h28v219.3h28V53.06h27.95v219.29h28V53.06h28v-164.47h28v-219.3h28V-550h83.88v219.29h-28v164.47h-28v219.3h-28v219.29h-28v164.47h-28v109.65h-83.91V436.82h-28V272.35h-28V53.06h-28v-219.3H310v219.3h-28v219.29h-28v164.47h-28v109.65ZM871.76 546.47v-54.82h-83.87v-54.83h-28V382H732v-54.82h-28V217.53h-28v-438.59h28v-109.65h28v-54.82h28v-54.82h28v-54.83h83.87V-550h139.79v54.82h83.87v54.83h28v54.82h27.95v54.82h28v109.65h28v438.59h-28v109.65h-28V382h-27.95v54.82h-28v54.83h-83.87v54.82ZM983.59 382v-54.82h55.91v-54.83h28v-54.82h28V107.88h28v-219.29h-28v-109.65h-28v-54.82h-28v-54.83h-55.91v-54.82h-83.87v54.82H843.8v54.83h-28v54.82h-28v109.65h-28v219.29h28v109.65h28v54.82h28v54.83h55.92V382Z',
  'M-88.24 546.47v-54.82h-83.87v-54.83h-28V382h-28v-54.82h-28V217.53h-27.95v-438.59H-256v-109.65h28v-54.82h28v-54.82h28v-54.83h83.87V-550H51.55v54.82h83.87v54.83h28v54.82h28v54.82h28v109.65h28v438.59h-28v109.65h-28V382h-28v54.82h-28v54.83H51.55v54.82ZM23.59 382v-54.82H79.5v-54.83h28v-54.82h28V107.88h28v-219.29h-28v-109.65h-28v-54.82h-28v-54.83H23.59v-54.82h-83.87v54.82h-55.92v54.83h-28v54.82h-28v109.65h-28v219.29h28v109.65h28v54.82h28v54.83h55.92V382ZM454.31 546.47V436.82h-28V272.35h-28V53.06h-28v-219.3h-28v-164.47h-28V-550h84.09v219.29h28v219.3h28V53.06h28v219.29h28V53.06h27.95v-164.47h28v-219.3h28V-550H678v219.29h28v219.3h28V53.06h28v219.29h28V53.06h28v-164.47h28v-219.3h27.95V-550h83.88v219.29h-28v164.47h-28v219.3h-28v219.29h-28.11v164.47h-28v109.65h-83.83V436.82h-28V272.35H678V53.06h-28v-219.3h-28v219.3h-28v219.29h-28v164.47h-28v109.65Z',
]

const limit = 50

const Wrapper = Component.flex.flex_wrap.article()
const Chunk = Component.svg()
