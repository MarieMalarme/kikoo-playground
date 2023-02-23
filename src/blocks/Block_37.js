import { useState, useEffect } from 'react'
import { get_invert_color } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_37 = ({ hovered, color }) => {
  //states hooks
  const [wrapper, set_wrapper] = useState(null)
  const [canvas, set_canvas] = useState(null)
  const [context, set_context] = useState(null)
  const [shape_path, set_shape_path] = useState(shapes_paths[0])
  const [{ x, y }, set_position] = useState({ x: 0, y: 0 })

  const draw_color = get_invert_color(color)

  // init context and draw first line
  useEffect(() => {
    if (!canvas) return
    const context = canvas.getContext('2d')
    set_context(context)

    context.fillStyle = draw_color

    // draw a first line
    let x = 120
    let y = 100

    for (let i = 0; i <= 5; i++) {
      const path_x = scale_svg_path(shape_path, x + step, y)
      context.fill(path_x)
      x += step
    }

    for (let i = 0; i <= 6; i++) {
      const path_x = scale_svg_path(shape_path, x + step, y)
      context.fill(path_x)
      const path_y = scale_svg_path(shape_path, x + step, y + step)
      context.fill(path_y)
      x += step
      y += step
    }

    for (let i = 0; i <= 4; i++) {
      const path_x = scale_svg_path(shape_path, x + step, y)
      context.fill(path_x)
      x += step
    }

    for (let i = 0; i <= 2; i++) {
      const path_x = scale_svg_path(shape_path, x + step, y)
      context.fill(path_x)
      const path_y = scale_svg_path(shape_path, x + step, y - step)
      context.fill(path_y)
      x += step
      y -= step
    }

    for (let i = 0; i <= 3; i++) {
      const path_x = scale_svg_path(shape_path, x + step, y)
      context.fill(path_x)
      x += step
    }

    for (let i = 0; i <= 4; i++) {
      const path_x = scale_svg_path(shape_path, x, y + step)
      context.fill(path_x)
      y += step
    }

    set_position({ x, y })
  }, [canvas, draw_color])

  // redraw item with new coordinates on key move
  useEffect(() => {
    if (!context || !hovered) return
    const path = scale_svg_path(shape_path, x, y)
    context.fill(path)
  }, [context, x, y, hovered, draw_color])

  // focus canvas when the block is hovered; onfocus when not
  useEffect(() => {
    if (!wrapper) return
    hovered ? wrapper.focus() : wrapper.blur()
  }, [hovered, wrapper])

  return (
    <Wrapper
      onKeyDown={(event) => {
        const { key } = event
        if (
          key !== 'ArrowDown' &&
          key !== 'ArrowUp' &&
          key !== 'ArrowLeft' &&
          key !== 'ArrowRight'
        )
          return
        event.preventDefault()
        event.key === 'ArrowDown' && set_position({ x, y: y + step })
        event.key === 'ArrowUp' && set_position({ x, y: y - step })
        event.key === 'ArrowLeft' && set_position({ x: x - step, y })
        event.key === 'ArrowRight' && set_position({ x: x + step, y })
      }}
      tabIndex="0"
      elemRef={set_wrapper}
    >
      <canvas
        ref={set_canvas}
        width={wrapper?.getBoundingClientRect().width}
        height={wrapper?.getBoundingClientRect().height}
      />

      <Controls>
        <Shapes>
          {shapes_paths.map((path, index) => {
            const is_selected = path === shape_path
            return (
              <Shape
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 1000"
                onClick={() => set_shape_path(path)}
              >
                <path
                  fill={is_selected ? 'white' : 'none'}
                  stroke={is_selected ? 'none' : 'white'}
                  strokeWidth={50}
                  d={path}
                />
              </Shape>
            )
          })}
        </Shapes>

        <ClearButton
          onClick={() => {
            context.clearRect(0, 0, canvas.width, canvas.height)
            const x = canvas.width / 2 - 20
            const y = canvas.height / 2 - 20
            const path = scale_svg_path(shape_path, x, y)
            context.fill(path)
            set_position({ x, y })
          }}
        >
          Reset canvas
        </ClearButton>
      </Controls>
    </Wrapper>
  )
}

const scale_svg_path = (coordinates, x, y) => {
  let matrix = document
    .createElementNS('http://www.w3.org/2000/svg', 'svg')
    .createSVGMatrix()
    .translate(x, y)
    .scale(0.035)

  const original_path = new Path2D(coordinates)
  const scaled_path = new Path2D()
  scaled_path.addPath(original_path, matrix)

  return scaled_path
}

const step = 15
const shapes_paths = [
  'M763.2 263.19a26.38 26.38 0 0 1-26.39-26.38C736.81 106.56 630.24 0 500 0S263.19 106.56 263.19 236.8a26.38 26.38 0 0 1-26.39 26.38C106.56 263.19 0 369.76 0 500s106.56 236.81 236.8 236.81a26.38 26.38 0 0 1 26.39 26.38C263.19 893.44 369.76 1000 500 1000s236.81-106.56 236.81-236.81a26.38 26.38 0 0 1 26.39-26.38c130.24 0 236.8-106.57 236.8-236.81S893.44 263.19 763.2 263.19Z',
  'm827.55 388.67 131.18 51c55 21.4 55 99.26 0 120.66l-131.18 51a379.57 379.57 0 0 0-216.22 216.22l-51 131.18c-21.4 55-99.26 55-120.66 0l-51-131.18a379.57 379.57 0 0 0-216.22-216.22l-131.18-51c-55-21.4-55-99.26 0-120.66l131.18-51a379.57 379.57 0 0 0 216.22-216.22l51-131.18c21.4-55 99.26-55 120.66 0l51 131.18a379.57 379.57 0 0 0 216.22 216.22Z',
  'M985.75 43.33 840.93 205.59c-72.29 81-113.13 185.61-113.19 294.19v5.68c1.26 106.75 42 209.26 113.12 288.92l144.89 162.29c12.37 19-10 41.45-29.08 29.08L794.41 840.93c-81-72.29-185.61-113.13-294.19-113.19h-5.68c-106.75 1.26-209.26 42-288.92 113.12L43.33 985.75c-19 12.37-41.45-10-29.08-29.08L159.1 794.38c71.09-79.66 111.9-182.17 113.12-288.92v-5.68c-.06-108.58-40.9-213.18-113.19-294.19L14.25 43.33c-12.37-19 10-41.45 29.08-29.08L205.62 159.1c79.66 71.09 182.17 111.9 288.92 113.12h5.68c108.58-.06 213.18-40.9 294.19-113.19L956.67 14.25c19.04-12.37 41.45 10.04 29.08 29.08Z',
  'M895.64 375.46h-31.59a44.14 44.14 0 0 1-44.14-44.14v-57.77a125.06 125.06 0 0 0-125.06-125.06h-26.17a44.14 44.14 0 0 1-44.14-44.13A104.35 104.35 0 0 0 520.19 0h-40.38a104.35 104.35 0 0 0-104.35 104.36 44.14 44.14 0 0 1-44.14 44.13h-26.17a125.06 125.06 0 0 0-125.06 125.06v57.77A44.14 44.14 0 0 1 136 375.46h-31.64A104.35 104.35 0 0 0 0 479.81v40.38a104.35 104.35 0 0 0 104.36 104.35H136a44.14 44.14 0 0 1 44.14 44.14v57.77a125.06 125.06 0 0 0 125.01 125.06h26.17a44.14 44.14 0 0 1 44.14 44.13A104.35 104.35 0 0 0 479.81 1000h40.38a104.35 104.35 0 0 0 104.35-104.36 44.14 44.14 0 0 1 44.14-44.13h26.17a125.06 125.06 0 0 0 125.06-125.06v-57.77a44.14 44.14 0 0 1 44.14-44.14h31.59A104.35 104.35 0 0 0 1000 520.19v-40.38a104.35 104.35 0 0 0-104.36-104.35Z',
  'M957.82 570.29 647.7 508.87c-9.71-1.93-9.71-15.81 0-17.74l310.12-61.42c43.48-14.49 56.5-69.67 24.1-102.08L672.37 18.08C640-14.32 584.78-1.3 570.29 42.18L508.87 352.3c-1.93 9.71-15.81 9.71-17.74 0L429.71 42.18C415.22-1.3 360-14.32 327.63 18.08L18.08 327.63C-14.32 360-1.3 415.22 42.18 429.71l310.12 61.42c9.71 1.93 9.71 15.81 0 17.74L42.18 570.29C-1.3 584.78-14.32 640 18.08 672.37l309.55 309.55c32.41 32.4 87.59 19.38 102.08-24.1l61.42-310.12c1.93-9.71 15.81-9.71 17.74 0l61.42 310.12c14.49 43.48 69.67 56.5 102.08 24.1l309.55-309.55c32.4-32.37 19.38-87.59-24.1-102.08Z',
  'M997 500c0-27.5-33.2-53-89.79-73.94a120.9 120.9 0 0 1-67.86-163.84c25.2-54.83 30.65-96.33 11.2-115.77s-60.94-14-115.78 11.2a120.9 120.9 0 0 1-163.84-67.86C550 33.2 524.49 0 497 0s-53 33.2-74 89.79a120.9 120.9 0 0 1-163.83 67.86c-54.83-25.2-96.33-30.65-115.78-11.2s-14 60.94 11.21 115.77a120.91 120.91 0 0 1-67.82 163.84C30.18 447-3 472.5-3 500s33.19 53 89.79 73.94a120.91 120.91 0 0 1 67.86 163.84c-25.2 54.83-30.65 96.33-11.21 115.77s60.95 14 115.78-11.2A120.9 120.9 0 0 1 423 910.21c21 56.59 46.49 89.79 74 89.79s53-33.2 73.94-89.79a120.9 120.9 0 0 1 163.83-67.86c54.84 25.2 96.34 30.65 115.78 11.2s14-60.94-11.2-115.77a120.9 120.9 0 0 1 67.85-163.84C963.79 553 997 527.5 997 500Z',
  'M646.07 155.76 986.27 6c7.55-3.32 11 .14 7.69 7.69L844.24 353.93a362.63 362.63 0 0 0 0 292.14L994 986.27c3.32 7.55-.14 11-7.69 7.69L646.07 844.24a362.63 362.63 0 0 0-292.14 0L13.73 994c-7.55 3.32-11-.14-7.69-7.69l149.72-340.2a362.63 362.63 0 0 0 0-292.14L6 13.73c-3.32-7.55.14-11 7.69-7.69l340.2 149.72a362.63 362.63 0 0 0 292.18 0Z',
  'M617.75 882.25V698.31a80.56 80.56 0 0 1 80.56-80.56h183.94C947 617.75 1000 564.76 1000 500c0-64.76-53-117.75-117.75-117.75H698.31a80.56 80.56 0 0 1-80.56-80.56V117.75C617.75 53 564.76 0 500 0c-64.76 0-117.75 53-117.75 117.75v183.94a80.56 80.56 0 0 1-80.56 80.56H117.75C53 382.25 0 435.24 0 500c0 64.76 53 117.75 117.75 117.75h183.94a80.56 80.56 0 0 1 80.56 80.56v183.94C382.25 947 435.24 1000 500 1000c64.76 0 117.75-53 117.75-117.75Z',
  'M489.56 17.32c5.77-23.15 14.92-23.08 20.33.16l36.63 157.32c20.1 82 133 142.17 214 118.59l152.31-43.79c22.93-6.59 27.65 1.57 10.48 18.15L806.84 380.16c-60.94 58.4-60.94 181.69 0 240.08l116.43 112.07c17.19 16.55 12.54 24.55-10.34 17.78l-155.26-46c-81-23.58-191 39.51-211.15 121.48l-36.61 156.98c-5.43 23.23-14.46 23.27-20.08.08l-38.76-159.92c-20.1-82-108.93-146.6-190-123L87.23 750.28C64.31 757 59.51 748.74 76.56 732l117.08-114.65c60.94-58.4 60.94-181.69 0-240.08L77.13 267.38c-17.36-16.37-12.78-24.45 10.19-18l155.49 44C323.85 317 431 253.88 451.07 171.91Z',
]

const Wrapper = Component.flex.jc_center.article()
const Controls =
  Component.blend_difference.absolute.b20.l0.ph10.w100p.flex.jc_between.ai_center.pl30.pr25.div()
const Shapes = Component.flex.ai_center.div()
const Shape = Component.mr25.of_visible.c_pointer.h20.w20.svg()
const ClearButton =
  Component.ol_none.b_rad25.pv5.ph10.ba.bg_none.c_pointer.white.b_white.button()
