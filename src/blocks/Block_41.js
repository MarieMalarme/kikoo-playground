import { Fragment, useState, useEffect } from 'react'
import { Component, Div } from '../utils/flags'
import { random, get_invert_color } from '../utils/toolbox'
import glitch from '../images/grey_gradient.jpeg'

const base_patterns = ['{', '88', ',', '+', 'A', '@', `//`, '#', '0', 'mmm']
const padding = 25
const character_width = 5

export const Block_41 = ({ color, is_selected }) => {
  const [canvas, set_canvas] = useState(null)
  const [wrapper, set_wrapper] = useState(null)
  const [image, set_image] = useState(glitch)
  const [ascii_lines, set_ascii_lines] = useState([])
  const [copy_text, set_copy_text] = useState('Copy ASCII image')
  const [patterns, set_patterns] = useState(base_patterns)

  useEffect(() => {
    if (!canvas || !wrapper) return
    const context = canvas.getContext('2d')
    load_image(context)
  }, [canvas, wrapper, patterns, image])

  const load_image = (context) => {
    const img = new Image()
    img.onload = () => {
      const ratio = img.height / img.width
      const wrapper_width = wrapper.getBoundingClientRect().width
      const line_width = wrapper_width - padding * 2
      const patterns_per_line = Math.round(line_width / character_width)
      const target_width = patterns_per_line
      const target_height = Math.floor(target_width * ratio)
      const img_dimensions = [0, 0, img.width, img.height]
      const target_dimensions = [0, 0, target_width, target_height]

      canvas.width = target_width
      canvas.height = target_height

      context.drawImage(img, ...img_dimensions, ...target_dimensions)
      const pixels = context.getImageData(...target_dimensions).data

      let patterns_list = []
      const chunk_size = 4
      for (let i = 0; i < pixels.length; i += chunk_size) {
        const [red, green, blue] = pixels.slice(i, i + chunk_size)
        const grey = Math.floor((red + green + blue) / 3)
        const index = Math.floor(grey / (255 / patterns.length))
        const matching_pattern = patterns[index]
        patterns_list.push(matching_pattern || patterns.at(0))
      }

      let lines = []
      for (let i = 0; i < patterns_list.length; i += patterns_per_line) {
        lines.push(patterns_list.slice(i, i + patterns_per_line))
      }

      set_ascii_lines(lines)
    }
    img.src = image
  }

  return (
    <Wrapper elemRef={set_wrapper}>
      <ControlsPanel
        patterns={patterns}
        set_patterns={set_patterns}
        image={image}
        set_image={set_image}
        copy_text={copy_text}
        set_copy_text={set_copy_text}
        set_canvas={set_canvas}
        ascii_lines={ascii_lines}
      />

      <Canvas none elemRef={set_canvas} width="0" height="0" />

      <AsciiImage style={{ lineHeight: '5px', color: get_invert_color(color) }}>
        {ascii_lines.map((line, index) => (
          <Line key={index}>
            {line.map((pattern, index) => (
              <Character key={index}>{pattern}</Character>
            ))}
          </Line>
        ))}
      </AsciiImage>
    </Wrapper>
  )
}

const ControlsPanel = (props) => {
  const { patterns, set_patterns, ascii_lines } = props
  const { image, set_image, copy_text, set_copy_text } = props
  const [is_open, set_is_open] = useState(true)

  return (
    <Fragment>
      <Toggle
        onClick={() => set_is_open(!is_open)}
        style={{ left: is_open ? 270 : 30 }}
        pv5={!is_open}
        ph20={!is_open}
        fs15={is_open}
        w20={is_open}
        h20={is_open}
      >
        {is_open ? '×' : 'Open settings'}
      </Toggle>

      {is_open && (
        <Controls>
          <Div mb10 relative flex ai_center jc_center>
            <LoadedImage
              style={{ objectFit: 'cover' }}
              src={image}
            ></LoadedImage>
            <Label>
              <LabelText>Import image</LabelText>
              <UploadInput
                type="file"
                onChange={(event) => {
                  const reader = new FileReader()
                  reader.onload = (event) => {
                    set_image(event.target.result)
                  }
                  reader.readAsDataURL(event.target.files[0])
                }}
              />
            </Label>
          </Div>

          {patterns.map((pattern, index) => (
            <Parameter
              type="text"
              index={index}
              value={pattern}
              key={`${index}-${pattern}`}
              label={`Pattern #${index + 1}`}
              remove_pattern={() =>
                set_patterns(patterns.filter((p) => p !== pattern))
              }
              set_value={(value) => {
                const first_half = patterns.slice(0, index)
                const second_half = patterns.slice(index + 1, patterns.length)
                const new_patterns = [...first_half, value, ...second_half]
                if (patterns.join() === new_patterns.join()) return
                set_patterns(new_patterns)
              }}
            />
          ))}

          <AddButton
            onClick={() =>
              set_patterns([
                ...patterns,
                ascii_characters.at(random(0, ascii_characters.length)),
              ])
            }
          >
            + Add a new pattern
          </AddButton>
        </Controls>
      )}

      <CopyButton
        onClick={() => {
          const ascii_string = ascii_lines
            .map((line) => `${line.map((c) => c[0]).join('')}\n`)
            .join('')

          navigator.clipboard.writeText(ascii_string)
          set_copy_text('ASCII image copied!')
          setTimeout(() => set_copy_text('Copy ASCII image'), 2000)
        }}
      >
        {copy_text}
      </CopyButton>
    </Fragment>
  )
}

const Parameter = ({ value, set_value, label, remove_pattern, ...props }) => {
  const [input_value, set_input_value] = useState(value)
  const has_typed = value.toString() !== input_value.toString()

  return (
    <ParameterWrapper
      onKeyDown={({ key }) => key === 'Enter' && set_value(input_value)}
    >
      <Div flex ai_center>
        <Input
          defaultValue={value}
          className="outline_button"
          onInput={({ target }) => set_input_value(target.value)}
          {...props}
        />
        <Button
          ml5
          mr10
          o50={!has_typed}
          c_pointer={has_typed}
          onClick={() => has_typed && set_value(input_value)}
        >
          OK
        </Button>
        {label}
      </Div>
      <RemoveButton onClick={remove_pattern}>-</RemoveButton>
    </ParameterWrapper>
  )
}

const ascii_characters = `~!@#$%^&*()_-+={}[]|\\'":;?/,.><o0`

const Wrapper = Component.relative.pa20.article()
const Canvas = Component.canvas()
const Button =
  Component.ls1.hover_shadow.b_rad10.h20.bg_white.ba.fs10.ph10.mono.button()
const RemoveButton =
  Component.c_pointer.flex_shrink0.ba.h15.w15.flex.ai_center.jc_center.b_rad50p.div()
const AddButton =
  Component.mt20.pv5.fs12.c_pointer.w100p.b_rad25.mono.bg_white.ba.button()
const CopyButton =
  Component.ph20.absolute.b30.l30.pv5.fs12.c_pointer.b_rad25.mono.bg_white.ba.button()
const Controls =
  Component.b_rad5.fs12.flex.flex_column.ai_flex_start.absolute.t30.l30.bg_white.pa20.w235.h65p.of_scroll.mr30.ba.flex_shrink0.div()
const ParameterWrapper = Component.w100p.mt10.flex.ai_center.jc_between.div()
const Input = Component.b_rad10.ba.h20.w45.text_center.fs12.input()
const AsciiImage =
  Component.of_scroll.fs8.w100p.h100p.mono.ws_nowrap.flex.ai_center.flex_column.div()
const Line = Component.flex.ai_center.div()
const Character =
  Component.w5.h5.flex_shrink0.flex.ai_center.jc_center.text_center.span()
const LoadedImage = Component.max_h100.w195.img()
const Label =
  Component.blend_difference.white.fs18.w100p.h100p.absolute.flex.ai_center.jc_center.label()
const LabelText = Component.ba.b_rad20.b_white.bw2.ph25.pv5.span()
const UploadInput = Component.o0.w100p.h100p.absolute.c_pointer.input()
const Toggle =
  Component.c_pointer.mono.lh15.t30.absolute.bg_white.b_rad25.fs12.ba.flex.ai_center.jc_center.div()
