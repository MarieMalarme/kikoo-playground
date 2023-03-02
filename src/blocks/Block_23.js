import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { Select } from '../utils/components'
import landscape from '../images/landscape.jpeg'
import glitch from '../images/glitch.png'

export const Block_23 = ({ id, color }) => {
  const [wrapper, set_wrapper] = useState(null)

  const [canvas, set_canvas] = useState(null)
  const [context, set_context] = useState(null)

  const [prev_mouse, set_prev_mouse] = useState(0)
  const [tool_size, set_tool_size] = useState(50)
  const [blend_mode, set_blend_mode] = useState('exclusion')

  const [downloading, set_downloading] = useState(false)

  const offset = tool_size / 2

  const wrapper_width = wrapper?.getBoundingClientRect().width
  const wrapper_height = wrapper && wrapper.getBoundingClientRect().height + 1

  const draw_image = (image, context, has_blend_mode) => {
    const img = new Image()
    img.onload = () => {
      context.clearRect(0, 0, wrapper_width, wrapper_height)

      if (has_blend_mode) {
        context.clearRect(0, 0, wrapper_width, wrapper_height)
        context.fillStyle = color.value
        context.fillRect(0, 0, wrapper_width, wrapper_height)
        context.globalCompositeOperation = blend_mode
      }

      context.drawImage(img, 0, 0, wrapper_width, wrapper_height)
    }
    img.src = image
    return img
  }

  const download = () => {
    set_downloading(true)

    const img = draw_image(canvas.toDataURL(), context, true)

    setTimeout(() => {
      const link = document.createElement('a')
      const image = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream')
      link.href = image
      const date = new Date().toISOString().split('T')[0]
      link.setAttribute('download', `masterpiece_${date}.png`)
      link.click()

      context.clearRect(0, 0, wrapper_width, wrapper_height)
      context.globalCompositeOperation = 'source-over'
      context.drawImage(img, 0, 0, wrapper_width, wrapper_height)

      set_downloading(false)
    }, 1000)
  }

  useEffect(() => {
    if (!canvas) return
    const context = canvas.getContext('2d')
    set_context(context)

    const img = new Image()
    img.onload = () => {
      context.drawImage(img, 0, 0, wrapper_width, wrapper_height)
    }
    img.src = glitch

    document.getElementById(`section-${id}`).style.overflow = 'visible'
  }, [id, canvas, wrapper_width, wrapper_height])

  return (
    <Wrapper id="glitch" elemRef={set_wrapper}>
      <Canvas
        o0={downloading}
        style={{ mixBlendMode: blend_mode }}
        onMouseMove={(event) => {
          const { clientX, clientY } = event
          const { offsetLeft, offsetTop } = wrapper.offsetParent
          const x = clientX - offsetLeft - offset
          const y = clientY - (offsetTop - window.pageYOffset) - offset

          const pixels = context.getImageData(x, y, tool_size, tool_size)
          const x_inc = event.clientX > prev_mouse.x ? 1 : -1
          const y_inc = event.clientY > prev_mouse.y ? 1 : -1
          context.putImageData(pixels, x + x_inc, y + y_inc)

          set_prev_mouse({ x: event.clientX, y: event.clientY })
        }}
        width={wrapper_width}
        height={wrapper_height + 1}
        elemRef={set_canvas}
      />

      {downloading && (
        <Downloading style={{ color: color.value }}>
          Downloading
          <br /> your masterpiece!
        </Downloading>
      )}

      <Controls>
        <Select
          list={blend_modes_list}
          value={blend_mode}
          set_value={set_blend_mode}
          hover_select={true}
        />

        <Input
          value={tool_size}
          onInput={(event) => set_tool_size(event.target.value)}
          type="range"
          min={20}
          max={150}
        />

        <Button relative mb10>
          Import image
          <Label>
            <input
              onChange={(event) => {
                const reader = new FileReader()
                reader.onload = (event) => {
                  draw_image(event.target.result, context)
                }
                reader.readAsDataURL(event.target.files[0])
              }}
              type="file"
            />
          </Label>
        </Button>

        <Button mb10 onClick={download}>
          Download image
        </Button>

        <Button onClick={() => draw_image(landscape, context)}>
          Reset image
        </Button>
      </Controls>
    </Wrapper>
  )
}

const blend_modes_list = [
  'exclusion',
  'difference',
  'overlay',
  'multiply',
  'screen',
  'darken',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'hue',
  'saturation',
  'color',
  'luminosity',
  'normal',
]

const Wrapper = Component.of_visible.article()
const Canvas = Component.t0.l0.absolute.canvas()
const Input = Component.mv10.input()
const Controls = Component.w140.absolute.l20.t20.div()
const Button = Component.c_pointer.ba0.w100p.sans.pv10.b_rad20.button()
const Label = Component.c_pointer.b_rad20.absolute.t0.l0.w100p.h100p.label()
const Downloading =
  Component.f_invert100.text_center.fs28.lh35.w100p.h100p.flex.ai_center.jc_center.div()
