import { Fragment, useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

// to do: handle resize drawing when selected in fullscreen

export const Block_50 = ({ color, hovered }) => {
  /******* states *******/

  const [wrapper, set_wrapper] = useState(null)
  const [canvas1, set_canvas1] = useState(null)
  const [canvas2, set_canvas2] = useState(null)
  const [canvas3, set_canvas3] = useState(null)
  const [canvas4, set_canvas4] = useState(null)
  const [contexts, set_contexts] = useState([])
  const [is_mouse_down, set_is_mouse_down] = useState(false)

  /******* effects *******/

  useEffect(() => {
    if (!canvas1 || !canvas2 || !canvas3 || !canvas4 || !wrapper) return

    // get & set the context of the canvas
    const context1 = canvas1.getContext('2d')
    const context2 = canvas2.getContext('2d')
    const context3 = canvas3.getContext('2d')
    const context4 = canvas4.getContext('2d')
    const contexts = [context1, context2, context3, context4]
    contexts.forEach((context) => (context.imageSmoothingEnabled = false))
    set_contexts(contexts)

    const { width, height } = wrapper.getBoundingClientRect()

    // draw a first curve on the canvas on load
    let start = { x: width / 3.5, y: height / 4 }

    for (let i = 0; i < width / 10; i++) {
      start.x += random(-1, 2)
      start.y += random(0, 2)
      const x = start.x
      const y = start.y
      draw_point({ x, y, contexts })
    }

    for (let i = 0; i < width / 15; i++) {
      start.x += random(-1, 2)
      start.y -= random(0, 2)
      const x = start.x
      const y = start.y
      draw_point({ x, y, contexts })
    }

    for (let i = 0; i < width / 20; i++) {
      start.x += random(0, 2)
      start.y -= random(0, 1)
      const x = start.x
      const y = start.y
      draw_point({ x, y, contexts })
    }

    for (let i = 0; i < width / 10; i++) {
      start.x += random(0, 2)
      start.y -= random(-1, 0)
      const x = start.x
      const y = start.y
      draw_point({ x, y, contexts })
    }
  }, [canvas1, canvas2, canvas3, canvas4, wrapper])

  useEffect(() => {
    const prevent_scroll = (event) => event.preventDefault()
    if (!wrapper) return
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
  }, [wrapper])

  useEffect(() => {
    if (!wrapper) return

    const handle_keydown = (event) => {
      if (!hovered || (event.key !== 's' && event.key !== 'b')) return
      download_canvas({ with_background: event.key === 'b' })
    }

    document.addEventListener('keydown', handle_keydown)
    return () => document.removeEventListener('keydown', handle_keydown)
  }, [wrapper, hovered])

  /******* functions *******/

  const clear_contexts = () => {
    contexts.forEach((context) =>
      context.clearRect(0, 0, innerWidth, innerHeight),
    )
  }

  const draw = (event, corner) => {
    if (!is_mouse_down) return

    event = event.type === 'touchmove' ? event.touches[0] : event

    const { clientX, clientY } = event
    const { offsetLeft, offsetTop } = wrapper.offsetParent
    let x = clientX - offsetLeft
    let y = clientY - (offsetTop - window.pageYOffset)

    if (corner.includes('right')) {
      x = canvas1.width - Math.abs(canvas1.width - x)
    }

    if (corner.includes('bottom')) {
      y = canvas1.height - Math.abs(canvas1.height - y)
    }

    draw_point({ x, y, contexts, wrapper })
  }

  const download_canvas = ({ with_background } = false) => {
    const full_export_canvas = document.createElement('canvas')
    const full_export_context = full_export_canvas.getContext('2d')
    const { width, height } = wrapper.getBoundingClientRect()
    full_export_canvas.width = width
    full_export_canvas.height = height
    full_export_context.imageSmoothingEnabled = false

    if (with_background) {
      full_export_context.fillStyle = color.value
      full_export_context.fillRect(0, 0, width, height)
    }

    contexts.forEach((context, index) => {
      // top left corner canvas - no mirroring
      if (index === 0) {
        full_export_context.drawImage(canvas1, 0, 0)
        return
      }

      const w = Math.floor(width / 2)
      const h = Math.floor(height / 2)

      const export_canvas = document.createElement('canvas')
      const export_context = export_canvas.getContext('2d')
      export_context.imageSmoothingEnabled = false
      export_canvas.width = w
      export_canvas.height = h

      // top right corner canvas - mirroring on x axis
      if (index === 1) {
        export_context.scale(-1, 1)
        export_context.drawImage(canvas1, w * -1, 0)
        full_export_context.drawImage(export_canvas, w, 0)
      }

      // bottom left corner canvas - mirroring on y axis
      if (index === 2) {
        export_context.scale(1, -1)
        export_context.drawImage(canvas1, 0, h * -1)
        full_export_context.drawImage(export_canvas, 0, h)
      }

      // bottom right corner canvas - mirroring on both x & y axes
      if (index === 3) {
        export_context.scale(-1, -1)
        export_context.drawImage(canvas1, w * -1, h * -1)
        full_export_context.drawImage(export_canvas, w, h)
      }

      export_canvas.remove()
    })

    const link = document.createElement('a')
    const image = full_export_canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    link.href = image
    const date = new Date().toISOString().split('T')[0]
    link.setAttribute('download', `mandala_${date}.png`)
    link.click()

    full_export_canvas.remove()
  }

  return (
    <Wrapper
      onMouseDown={() => set_is_mouse_down(true)}
      onMouseUp={() => set_is_mouse_down(false)}
      onMouseLeave={() => set_is_mouse_down(false)}
      elemRef={set_wrapper}
      onDoubleClick={clear_contexts}
    >
      <Instruction t10 l20>
        Click & move to draw
      </Instruction>
      <Instruction t10 r20>
        Double click to clear
      </Instruction>
      <Instruction b10 l20>
        Press S to save without background
      </Instruction>
      <Instruction b10 r20>
        Press B to save with background
      </Instruction>

      {wrapper && (
        <Fragment>
          <Canvas
            width={wrapper.getBoundingClientRect().width / 2}
            height={wrapper.getBoundingClientRect().height / 2}
            elemRef={set_canvas1}
            onMouseMove={(event) => draw(event, 'top left')}
            onTouchMove={(event) => draw(event, 'top left')}
          />
          <Canvas
            style={{ transform: 'scaleX(-1)' }}
            width={wrapper.getBoundingClientRect().width / 2}
            height={wrapper.getBoundingClientRect().height / 2}
            elemRef={set_canvas2}
            onMouseMove={(event) => draw(event, 'top right')}
            onTouchMove={(event) => draw(event, 'top right')}
          />
          <Canvas
            style={{ transform: 'scaleY(-1)' }}
            width={wrapper.getBoundingClientRect().width / 2}
            height={wrapper.getBoundingClientRect().height / 2}
            elemRef={set_canvas3}
            onMouseMove={(event) => draw(event, 'bottom left')}
            onTouchMove={(event) => draw(event, 'bottom left')}
          />
          <Canvas
            style={{ transform: 'scale(-1)' }}
            width={wrapper.getBoundingClientRect().width / 2}
            height={wrapper.getBoundingClientRect().height / 2}
            elemRef={set_canvas4}
            onMouseMove={(event) => draw(event, 'bottom right')}
            onTouchMove={(event) => draw(event, 'bottom right')}
          />
        </Fragment>
      )}
    </Wrapper>
  )
}

const draw_point = ({ x, y, contexts }) => {
  contexts.forEach((context) => {
    if (!context) return
    context.fillStyle = 'lime'
    context.beginPath()
    context.arc(x - half_point, y - half_point, point_size, 0, Math.PI * 2)
    context.fill()
  })
}

const point_size = 5
const half_point = point_size / 2
const { innerWidth, innerHeight } = window
const Wrapper = Component.flex.flex_wrap.article()
const Canvas = Component.w50p.h50p.canvas()
const Instruction =
  Component.white.blend_difference.no_events.absolute.zi1.div()
