import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_61 = ({ hovered }) => {
  const [wrapper, set_wrapper] = useState(null)
  const [has_clicked, set_has_clicked] = useState(null)
  const [mouse, set_mouse] = useState({ x: 100, y: 100 })
  const [hsl, set_hsl] = useState({ hue: 140, luminosity: 50 })
  const [{ width, height }, set_dimensions] = useState({ width: 0, height: 0 })

  const { hue, luminosity } = hsl
  const color = `hsl(${hue}, 50%, ${luminosity}%)`

  useEffect(() => {
    if (!wrapper) return
    const set = () => {
      const dimensions = wrapper.getBoundingClientRect()
      set_dimensions(dimensions)
      set_mouse({
        x: random(padding, dimensions.width - padding),
        y: random(padding, dimensions.height - padding),
      })
    }

    const resizeObserver = new ResizeObserver(set)
    resizeObserver.observe(wrapper)
    return () => resizeObserver.disconnect()
  }, [wrapper])

  useEffect(() => {
    if (!wrapper) return
    const prevent_scroll = (event) => event.preventDefault()
    wrapper.addEventListener('touchmove', prevent_scroll, { passive: false })
    return () => document.removeEventListener('touchmove', prevent_scroll)
  }, [wrapper])

  useEffect(() => {
    const copy = (event) => {
      event.preventDefault()
      if (!event.clipboardData) return
      event.clipboardData.setData('text/plain', color)
    }

    document.addEventListener('copy', copy)
    return () => document.removeEventListener('copy', copy)
  }, [color])

  useEffect(() => {
    clearTimeout(timeout_id)
    timeout_id = setTimeout(() => set_has_clicked(false), 800)
  }, [has_clicked])

  const update_values = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const { offsetTop, offsetLeft } = wrapper.offsetParent
    const client_x = event.clientX - offsetLeft
    const client_y = event.clientY - (offsetTop - window.pageYOffset)
    set_mouse({ x: client_x, y: client_y })

    const allowed_x = client_x > padding && width - client_x > padding
    const allowed_y = client_y > padding && height - client_y > padding

    if (!allowed_y || !allowed_x) return

    const translated_x = client_x - padding
    const max_x = width - padding * 2
    const hue = calc_interval_value(translated_x / max_x, 360)

    const translated_y = client_y - padding
    const max_y = height - padding * 2
    const luminosity = calc_interval_value(translated_y / max_y, 100)

    set_hsl({ ...hsl, hue, luminosity })
  }

  return (
    <Wrapper
      elemRef={set_wrapper}
      onTouchMove={update_values}
      onMouseMove={update_values}
      onClick={() => {
        document.execCommand('copy')
        set_has_clicked(true)
      }}
      style={{ background: color, cursor: 'none' }}
    >
      <Dot className="circle-pop-disappear" />
      <Value t40 r40>
        hue {hue}
      </Value>
      <Value b40 l40>
        luminosity {luminosity}
      </Value>
      <LineHorizontal style={{ top: mouse.y }} />
      <LineVertical style={{ left: mouse.x }} />
      {has_clicked && (
        <Cursor
          className="circle-pop-disappear"
          style={{ top: mouse.y - 5, left: mouse.x - 5 }}
        />
      )}
      <Value
        mono
        fs12
        ws_nowrap
        c_none
        style={{ left: mouse.x + 15, top: mouse.y + 10 }}
      >
        {has_clicked ? 'Copied to clipboard!' : 'Click to pick'}
      </Value>
    </Wrapper>
  )
}

const calc_interval_value = (number, max) =>
  Math.round(Math.min(max, Math.max(0, max * number)))

let timeout_id
const padding = 40

const Wrapper = Component.flex.ai_center.jc_center.article()
const Value = Component.absolute.blend_difference.white.div()
const Dot =
  Component.h15.w15.l40.t40.absolute.b_rad50p.bg_white.blend_difference.div()
const LineHorizontal =
  Component.blend_difference.absolute.w100p.h1.bg_white.o50.div()
const LineVertical =
  Component.blend_difference.absolute.h100p.w1.bg_white.o50.div()
const Cursor = Component.o0.absolute.blend_difference.b_rad50p.bg_white.div()
