import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'
import * as THREE from 'three'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { STLExporter } from 'three/addons/exporters/STLExporter.js'

const { Scene, PerspectiveCamera, AmbientLight, DirectionalLight } = THREE
const { WebGLRenderer, ExtrudeGeometry, Mesh, Box3 } = THREE
const { Group, MeshStandardMaterial, Matrix4 } = THREE
const material = new MeshStandardMaterial({ color: 'white' })

export const Block_63 = ({ color }) => {
  const [scene_ref, set_scene_ref] = useState(null)
  const [points, set_points] = useState([])
  const [is_mouse_down, set_is_mouse_down] = useState(false)
  const [has_clicked, set_has_clicked] = useState(false)
  const [has_finished, set_has_finished] = useState(false)
  const [{ scene, camera, renderer, controls }, set_three] = useState({})

  useEffect(() => {
    if (!scene_ref) return
    const { width, height } = scene_ref.getBoundingClientRect()

    const scene = new Scene()

    const camera = new PerspectiveCamera(75, width / height, 0.1, 5000)
    camera.position.x = -(width / 5)
    camera.position.y = width / 5
    camera.position.z = width / 3

    const light = new AmbientLight('khaki', 0.4)
    scene.add(light)

    const spot1 = new DirectionalLight('khaki')
    spot1.position.x = -(width / 2)
    spot1.position.y = width
    spot1.position.z = width / 2
    scene.add(spot1)

    const spot2 = new DirectionalLight('khaki')
    spot2.position.x = width / 5
    spot2.position.y = -width
    spot2.position.z = -(width / 2)
    scene.add(spot2)

    const renderer = new WebGLRenderer({ alpha: true, antialias: true })
    renderer.setClearAlpha(0)
    renderer.setSize(width, height)
    scene_ref.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    const render = () => renderer.render(scene, camera)
    controls.addEventListener('change', render)

    set_three({ scene, camera, renderer, controls })
  }, [scene_ref])

  useEffect(() => {
    if (!scene || !renderer || !camera) return

    scene.children.map((child) => child.type === 'Group' && scene.remove(child))

    if (has_finished) {
      const svg_markup = `<polyline stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="blue" points="${points.join()}"></polyline>`

      const loader = new SVGLoader()
      const svg_data = loader.parse(svg_markup)
      const svg_group = new Group()
      svg_group.scale.y *= -1

      svg_data.paths.forEach((path) => {
        const shapes = path.toShapes(true)
        shapes.forEach((shape) => {
          const options = { depth: 40 }
          const geometry = new ExtrudeGeometry(shape, options)
          const mesh = new Mesh(geometry, material)
          svg_group.add(mesh)
        })
      })

      // center the shape
      const box = new Box3().setFromObject(svg_group)
      box.getCenter(svg_group.position).multiplyScalar(-1)

      scene.add(svg_group)
    } else {
      // when a new drawing is ready to be drawn, reset the camera position
      const { width } = scene_ref.getBoundingClientRect()
      camera.position.set(-(width / 5), width / 5, width / 3)
      controls.update()
    }

    renderer.render(scene, camera)
  }, [has_finished, scene, camera, renderer, controls, points, scene_ref])

  const handle_mousedown = (event) => {
    set_is_mouse_down(true)
    !has_clicked && set_has_clicked(true)
  }

  const handle_mouseup = (event) => {
    set_is_mouse_down(false)

    if (points.length > 2) {
      set_points([...points, points.at(0), points.at(1)])
      set_has_finished(true)
    } else {
      set_points([])
    }
  }

  const handle_mousemove = (event) => {
    if (!is_mouse_down) return

    event = event.type === 'touchmove' ? event.touches[0] : event
    const { offsetLeft, offsetTop } = scene_ref.offsetParent
    const x = event.clientX - offsetLeft
    const y = event.clientY - (offsetTop - window.pageYOffset)
    set_points([...points, x, y])
  }

  return (
    <Wrapper
      id="canvas-3d"
      className={has_finished ? 'drawn' : 'drawing'}
      style={{ background: 'darkcyan' }}
      elemRef={set_scene_ref}
    >
      {!has_clicked && (
        <Instruction style={{ color: 'khaki', border: 'solid 1px khaki' }}>
          Draw something!
        </Instruction>
      )}

      {has_finished ? (
        <Buttons>
          <Button
            style={{ color: 'khaki', border: 'solid 1px khaki' }}
            onClick={() => {
              // get the doodle mesh from the scene
              const group = scene.children.find(({ type }) => type === 'Group')
              const mesh = group.children[0]
              // mirror the geometry on y axis so it is not exported with empty faces
              mesh.geometry.applyMatrix4(new Matrix4().makeScale(1, -1, 1))

              const exporter = new STLExporter()
              const stl = exporter.parse(mesh, { binary: true })
              const blob = new Blob([stl], { type: 'text/plain' })

              const link = document.createElement('a')
              link.href = URL.createObjectURL(blob)
              link.download = 'my-beautiful-doodle.stl'
              link.click()

              // mirror the geometry back to display it with filled faces
              mesh.geometry.applyMatrix4(new Matrix4().makeScale(1, -1, 1))
            }}
          >
            Download STL file
          </Button>
          <Button
            style={{ color: 'khaki', border: 'solid 1px khaki' }}
            onClick={() => {
              set_points([])
              set_has_finished(false)
            }}
          >
            I wanna draw again!
          </Button>
        </Buttons>
      ) : (
        <Svg
          onMouseDown={handle_mousedown}
          onTouchStart={handle_mousedown}
          onMouseUp={handle_mouseup}
          onTouchEnd={handle_mouseup}
          onMouseMove={handle_mousemove}
          onTouchMove={handle_mousemove}
          xmlns="http://www.w3.org/2000/svg"
        >
          {points.length > 2 && (
            <polyline
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="khaki"
              points={points.join()}
            />
          )}
        </Svg>
      )}
    </Wrapper>
  )
}

const Wrapper = Component.flex.jc_center.ai_center.article()
const Instruction = Component.absolute.ph20.pv10.b_rad50.fs22.div()
const Svg = Component.t0.l0.absolute.w100p.h100p.svg()
const Buttons = Component.b20.absolute.div()
const Button =
  Component.mh10.mh5__xs.bg_none.c_pointer.sans.fs16.fs14__xs.ph20.ph15__xs.pv10.b_rad20.button()
