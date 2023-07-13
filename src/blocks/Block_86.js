import { useState, useEffect } from 'react'
import { Component, Div } from '../utils/flags'
import noise from '../images/noise.jpg'

export const Block_86 = ({ is_selected }) => {
  const [svg, set_svg] = useState(null)
  const [canvas, set_canvas] = useState(null)
  const [context, set_context] = useState(null)
  const [image, set_image] = useState(noise)
  const [dots_lines, set_dots_lines] = useState([])
  const [is_loading, set_is_loading] = useState(true)

  const [colors, set_colors] = useState({
    background: '#cba8ff',
    pattern: '#fdff7b',
  })

  // customizable input parameters
  const [dots_per_line, set_dots_per_line] = useState(50)

  useEffect(() => {
    if (!canvas) return
    const context = canvas.getContext('2d', { willReadFrequently: true })
    set_context(context)
  }, [canvas])

  useEffect(() => {
    if (!context) return
    load_image(noise)
  }, [context, dots_per_line, image])

  const load_image = () => {
    const img = new Image()
    img.onload = () => {
      const ratio = img.height / img.width
      const target_width = dots_per_line
      const target_height = Math.floor(target_width * ratio)
      const img_dimensions = [0, 0, img.width, img.height]
      const target_dimensions = [0, 0, target_width, target_height]

      canvas.width = target_width
      canvas.height = target_height

      context.drawImage(img, ...img_dimensions, ...target_dimensions)
      const pixels = context.getImageData(...target_dimensions).data

      let dots_sizes_in_percentage = []
      const chunk_size = 4

      for (let i = 0; i < pixels.length; i += chunk_size) {
        const [red, green, blue] = pixels.slice(i, i + chunk_size)
        const grey = Math.floor((red + green + blue) / 3)
        const size_in_percentage = Math.floor(grey / (255 / 90)) // capped at 90% to not touch the neighbour dot
        dots_sizes_in_percentage.push(size_in_percentage)
      }

      let lines = []
      for (let i = 0; i < dots_sizes_in_percentage.length; i += dots_per_line) {
        lines.push(dots_sizes_in_percentage.slice(i, i + dots_per_line))
      }

      set_dots_lines(dots_sizes_in_percentage)
      set_is_loading(false)
    }
    img.src = image
  }

  const view_box = {
    width: dots_per_line * dot_size,
    height: Math.floor(dots_lines.length / dots_per_line) * dot_size,
  }

  return (
    <Wrapper>
      <Controls>
        <Canvas elemRef={set_canvas} width="0" height="0" />

        <ImageInput>
          <LoadedImage src={image}></LoadedImage>
          <Label>
            <LabelText>Import image</LabelText>
            <UploadInput
              type="file"
              onChange={(event) => {
                const reader = new FileReader()
                reader.onload = (event) => set_image(event.target.result)
                reader.readAsDataURL(event.target.files[0])
              }}
            />
          </Label>
        </ImageInput>

        <Parameter
          min={20}
          max={200}
          type="number"
          label="Dots p/ line"
          value={dots_per_line}
          set_is_loading={set_is_loading}
          set_value={(value) =>
            value >= 20 && value <= 200 && set_dots_per_line(Number(value))
          }
        />

        <ParameterWrapper>
          Background color
          <ColorInput
            type="color"
            value={colors.background}
            onInput={(event) =>
              set_colors({ ...colors, background: event.target.value })
            }
          />
        </ParameterWrapper>

        <ParameterWrapper>
          Pattern color
          <ColorInput
            type="color"
            value={colors.pattern}
            onInput={(event) =>
              set_colors({ ...colors, pattern: event.target.value })
            }
          />
        </ParameterWrapper>

        <DownloadButton
          onClick={() => {
            const cloned_svg = svg.cloneNode(true)
            cloned_svg.removeAttribute('style')
            cloned_svg.removeAttribute('width')
            cloned_svg.removeAttribute('height')
            const { outerHTML: svg_html } = cloned_svg
            const blob = new Blob([svg_html], {
              type: 'image/svg+xml;charset=utf-8',
            })
            const URL = window.URL || window.webkitURL || window
            const url = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = `dots.svg`
            link.click()
            link.remove()
          }}
        >
          Download SVG
        </DownloadButton>
      </Controls>

      <Svg
        elemRef={set_svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${view_box.width} ${view_box.height}`}
      >
        <rect
          x={0}
          y={0}
          width={view_box.width}
          height={view_box.height}
          fill={colors.background}
        />

        <g fill={colors.pattern}>
          {!is_loading &&
            dots_lines.map((size_in_percentage, index) => {
              const line_index = Math.floor(index / dots_per_line)
              return (
                <circle
                  key={index}
                  r={size_in_percentage / 2}
                  cy={line_index * dot_size + dot_size / 2}
                  cx={(index % dots_per_line) * dot_size + dot_size / 2}
                />
              )
            })}
        </g>
      </Svg>
    </Wrapper>
  )
}

const Parameter = ({ value, set_value, label, set_is_loading, ...props }) => {
  const [input_value, set_input_value] = useState(value)
  const has_typed = value.toString() !== input_value.toString()

  return (
    <ParameterWrapper
      onKeyDown={({ key }) => key === 'Enter' && set_value(input_value)}
    >
      <Div flex ai_center>
        {label}
        <Input
          defaultValue={value}
          className="outline_button"
          onInput={({ target }) => set_input_value(target.value)}
          {...props}
        />
        <Button
          o50={!has_typed}
          c_pointer={has_typed}
          onClick={() => {
            if (!has_typed) return
            set_value(input_value)
            set_is_loading(true)
          }}
        >
          OK
        </Button>
      </Div>
    </ParameterWrapper>
  )
}

const dot_size = 100

const Wrapper = Component.w100p.h100p.of_scroll.div()
const Canvas = Component.none.canvas()
const Button =
  Component.ml5.ls1.hover_shadow.b_rad10.h20.bg_white.ba.fs10.w30.mono.button()
const Controls =
  Component.absolute.flex.flex_column.ai_flex_start.t20.l20.bg_white.pa15.w180.mr30.ba.flex_shrink0.div()
const ParameterWrapper =
  Component.w100p.fs13.mt7.flex.ai_center.jc_between.div()
const Input = Component.ml10.sans.fs11.b_rad10.ba.h20.w35.text_center.input()
const Svg = Component.w100p.svg()
const ImageInput = Component.mb5.w100p.relative.flex.ai_center.jc_center.div()
const LoadedImage = Component.w100p.img()
const Label =
  Component.blend_difference.white.fs15.h100p.absolute.flex.ai_center.jc_center.label()
const LabelText = Component.ba.b_rad20.b_white.ph15.pv5.span()
const UploadInput = Component.o0.w100p.h100p.absolute.c_pointer.input()
const DownloadButton =
  Component.c_pointer.bg_white.w100p.mt10.fs14.ba.b_rad50.sans.ph15.pv5.button()
const ColorInput = Component.ml10.input()
