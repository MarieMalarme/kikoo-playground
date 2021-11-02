import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

import cat_1_1 from '../images/cat-1-1.jpg'
import cat_1_2 from '../images/cat-1-2.jpg'
import cat_1_3 from '../images/cat-1-3.jpg'
import cat_1_4 from '../images/cat-1-4.jpg'

import cat_2_1 from '../images/cat-2-1.jpg'
import cat_2_2 from '../images/cat-2-2.jpg'
import cat_2_3 from '../images/cat-2-3.jpg'
import cat_2_4 from '../images/cat-2-4.jpg'

import cat_3_1 from '../images/cat-3-1.jpg'
import cat_3_2 from '../images/cat-3-2.jpg'
import cat_3_3 from '../images/cat-3-3.jpg'
import cat_3_4 from '../images/cat-3-4.jpg'

import cat_4_1 from '../images/cat-4-1.jpg'
import cat_4_2 from '../images/cat-4-2.jpg'
import cat_4_3 from '../images/cat-4-3.jpg'
import cat_4_4 from '../images/cat-4-4.jpg'

const limit = 50

export const Block_16 = () => {
  const [selected_cat_index, set_selected_cat_index] = useState(0)
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

  const update_mouse = (event) => {
    event = event.type === 'touchmove' ? event.touches[0] : event
    const { clientX: client_x, clientY } = event
    const scrolled_y = wrapper.offsetParent.offsetTop - window.pageYOffset
    const client_y = clientY - scrolled_y

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
      {wrapper &&
        cats[selected_cat_index].map((image, index) => (
          <Image
            key={index}
            src={image}
            b0={index >= 2}
            t0={index <= 1}
            r0={index % 2}
            l0={!(index % 2)}
            width={index % 2 ? width - mouse.x : mouse.x}
            height={index <= 1 ? mouse.y : height - mouse.y}
          />
        ))}
      <Button
        onClick={() => {
          const is_last_index = selected_cat_index === cats.length - 1
          const next_index = is_last_index ? 0 : selected_cat_index + 1
          set_selected_cat_index(next_index)
        }}
      >
        Another one!
      </Button>
    </Wrapper>
  )
}

const cat_1 = [cat_1_1, cat_1_2, cat_1_3, cat_1_4]
const cat_2 = [cat_2_1, cat_2_2, cat_2_3, cat_2_4]
const cat_3 = [cat_3_1, cat_3_2, cat_3_3, cat_3_4]
const cat_4 = [cat_4_1, cat_4_2, cat_4_3, cat_4_4]
const cats = [cat_1, cat_2, cat_3, cat_4]

const Wrapper = Component.flex.flex_wrap.ai_center.jc_center.article()
const Button = Component.absolute.t20.mono.fs12.pv5.ph10.as_center.button()
const Image = Component.ma0.img()
