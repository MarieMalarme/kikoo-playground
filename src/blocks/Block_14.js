import { useState } from 'react'
import { Component } from '../utils/flags'

export const Block_14 = () => {
  const [video, set_video] = useState(null)
  const [canvas, set_canvas] = useState(null)
  const [picture, set_picture] = useState()
  const [stream, set_stream] = useState()
  const [filters, set_filters] = useState(default_filters)

  const start_webcam = async () => {
    picture && set_picture()

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      set_stream(stream)
      video.srcObject = stream
      video.play()
    } catch (error) {
      console.log(error)
      set_stream({ error })
    }
  }

  const capture = () => {
    // transfer the image data to the canvas and store it in the picture state
    const { width, height } = video.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d').drawImage(video, 0, 0, width, height)
    const picture = canvas.toDataURL('image/png')
    set_picture(picture)

    // stop the webcam stream
    stream.getTracks().forEach((track) => track.stop())
    set_stream()
  }

  // generate the string to set the css filter property
  const filter = Object.entries(filters).reduce(
    (string, [property, { value, unit }]) =>
      `${string} ${property}(${value}${unit})`,
    '',
  )

  if (stream?.error) {
    return (
      <Wrapper flex_column jc_flex_start>
        <ErrorMessage>
          An error occurred and we were not able to start your webcam :(
        </ErrorMessage>
        <Detail>Error: {stream.error.message}</Detail>
        <Button onClick={start_webcam}>Retry to start webcam</Button>
      </Wrapper>
    )
  }

  return (
    <Wrapper jc_center id="block-14">
      {picture && (
        <Image style={{ background: `top / cover url(${picture})`, filter }} />
      )}
      <Video
        elemRef={set_video}
        style={{ filter }}
        none={picture}
        width="100%"
      />
      <Button onClick={stream ? capture : start_webcam}>
        {stream ? 'Take a pic' : 'Start webcam'}
      </Button>
      <Canvas elemRef={set_canvas} />
      <Filters>
        {filters_types.map(({ property, unit, max }) => (
          <Control key={property}>
            <input
              min={0}
              max={max}
              type="range"
              step={property === 'brightness' ? 0.1 : 1}
              defaultValue={filters[property]?.value || 0}
              onInput={(event) => {
                const { value } = event.target
                set_filters({ ...filters, [property]: { value, unit } })
              }}
            />
            <Label>{property}</Label>
          </Control>
        ))}
      </Filters>
    </Wrapper>
  )
}

const filters_types = [
  { property: 'blur', unit: 'px', max: 20 },
  { property: 'brightness', unit: '', max: 2 },
  { property: 'contrast', unit: '%', max: 200 },
  { property: 'grayscale', unit: '%', max: 100 },
  { property: 'hue-rotate', unit: 'deg', max: 360 },
  { property: 'invert', unit: '%', max: 100 },
  { property: 'saturate', unit: '%', max: 200 },
  { property: 'sepia', unit: '%', max: 100 },
]

const default_filters = {
  saturate: { value: 170, unit: '%' },
  brightness: { value: 1.5, unit: '' },
  contrast: { value: 170, unit: '%' },
  'hue-rotate': { value: 190, unit: 'deg' },
}

const Wrapper = Component.flex.ai_center.article()
const Video = Component.absolute.t0.fit_cover.video()
const Canvas = Component.none.canvas()
const Button =
  Component.fs15.bg_black.white.b30.absolute.ph20.pv10.b_rad20.ba0.sans.c_pointer.button()
const Image = Component.w100p.h100p.div()
const Filters = Component.t10.l10.absolute.div()
const Control = Component.flex.ai_center.mb5.div()
const Label = Component.ml10.fs14.block.label()
const ErrorMessage =
  Component.mt50.mb10.pv10.ph15.w50p.text_center.bg_grey2.div()
const Detail = Component.mono.fs12.span()
