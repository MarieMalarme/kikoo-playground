import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

// stop the mic when out of view or after too long ?
export const Block_32 = ({ color, is_selected }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [dimensions, set_dimensions] = useState(null)
  const [canvas, set_canvas] = useState(null)
  const [context, set_context] = useState(null)
  const [stream, set_stream] = useState(null)
  const [drawing, set_drawing] = useState(false)

  useEffect(() => {
    if (!wrapper) return
    set_dimensions(wrapper.getBoundingClientRect())
  }, [wrapper, is_selected])

  useEffect(() => {
    if (!dimensions) return
    const context = canvas.getContext('2d')
    set_context(context)

    draw_circle(60, context, wrapper, color)
  }, [dimensions, canvas, color, wrapper])

  useEffect(() => {
    // cover progressively the circles by redrawing the background
    const fade_out = () => {
      if (!context || !stream) return
      const { hue, saturation, luminosity } = color
      context.fillStyle = `hsla(${hue}, ${saturation}%, ${luminosity}%, ${alpha})`
      context.fillRect(0, 0, canvas.width, canvas.height)
      animation_id = requestAnimationFrame(fade_out)
    }

    animation_id = drawing
      ? requestAnimationFrame(fade_out)
      : cancelAnimationFrame(animation_id)
  }, [stream, drawing, context, canvas, color])

  const start_mic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      set_stream(stream)
      handle_stream(stream, context, wrapper, color, set_drawing)
    } catch (error) {
      console.log(error)
      set_stream({ error })
    }
  }

  const stop_mic = () => {
    stream.getTracks().forEach((track) => track.stop())
    set_drawing(false)
    set_stream()
  }

  if (stream?.error) {
    return (
      <Wrapper flex_column>
        <ErrorMessage>
          An error occurred and we were not able to start your microphone :(
        </ErrorMessage>
        <Detail>Error: {stream.error.message}</Detail>
        <Button mt50 absolute={false} onClick={start_mic}>
          Retry to start microphone
        </Button>
      </Wrapper>
    )
  }

  return (
    <Wrapper elemRef={set_wrapper}>
      <Button onClick={stream ? stop_mic : start_mic}>
        {stream ? 'Stop' : 'Start'} microphone
      </Button>
      <canvas
        ref={set_canvas}
        width={dimensions?.width}
        height={dimensions?.height}
      />
    </Wrapper>
  )
}

const handle_stream = (stream, context, wrapper, color, set_drawing) => {
  const audio_context = new AudioContext()
  const analyser = audio_context.createAnalyser()
  const microphone = audio_context.createMediaStreamSource(stream)

  microphone.connect(analyser)
  analyser.fftSize = 32

  const buffer_length = analyser.frequencyBinCount
  const frequency_data = new Float32Array(buffer_length)

  setInterval(() => {
    if (!stream.active) return

    analyser.getFloatFrequencyData(frequency_data)
    const frequency = Math.max(...frequency_data)

    draw_circle(frequency, context, wrapper, color)
    set_drawing(true)
    clearTimeout(timeout_id)
    timeout_id = setTimeout(() => set_drawing(false), 1000)
  }, 100)
}

const draw_circle = (frequency, context, wrapper, color) => {
  const { height, width } = wrapper.getBoundingClientRect()
  const { hue, luminosity } = color

  const pos_frequency = max_frequency - Math.abs(frequency)
  const scaled_frequency = ((height / 2 - 5) * pos_frequency) / max_frequency
  const radius = scaled_frequency > 10 ? scaled_frequency : 10

  context.beginPath()
  context.strokeStyle = `hsl(${hue + 180}, 100%, ${100 - luminosity}%)`
  context.lineWidth = 2
  context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI)
  context.stroke()
}

let animation_id
let timeout_id

const alpha = 0.1
const max_frequency = 150

const Wrapper = Component.flex.ai_center.jc_center.article()
const Button =
  Component.fs15.absolute.t20.l20.b_rad20.ba0.ph20.pv10.sans.c_pointer.button()
const ErrorMessage =
  Component.mb10.pv10.ph15.fs14.w80p.text_center.bg_grey2.div()
const Detail = Component.mono.fs12.span()
