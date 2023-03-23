import { Fragment, useState, useEffect } from 'react'
import { Component } from './utils/flags'
import { random, scroll_to } from './utils/toolbox'
import { blocks_list } from './blocks/blocks'
import { Block } from './blocks/Block'
import { Intro } from './Intro'

const App = () => {
  const [hovered_block, set_hovered_block] = useState(0)
  const [selected_block, set_selected_block] = useState(null)
  const [scroll_top, set_scroll_top] = useState(null)

  // check if there is a block id in the url params to scroll it into view
  useEffect(() => {
    setTimeout(() => {
      const block_id = Number(window.location.pathname.slice(1))
      if (isNaN(block_id)) return
      const target = document.querySelector(`#section-${block_id}`)
      if (!target) return
      target.scrollIntoView({ block: 'center', behavior: 'smooth' })
      set_hovered_block(block_id)
    }, 750)
  }, [])

  useEffect(() => {
    const { matches } = window.matchMedia('(max-width: 600px)')
    document.body.style.overflow = selected_block || matches ? 'hidden' : 'auto'
  }, [selected_block])

  useEffect(() => {
    const exit_fullscreen = async (event) => {
      if (event.key !== 'Escape' || !selected_block) return
      await set_selected_block(null)
      window.scrollTo(0, scroll_top)
    }

    document.addEventListener('keydown', exit_fullscreen)
    return () => document.removeEventListener('keydown', exit_fullscreen)
  }, [scroll_top, selected_block])

  return (
    <Fragment>
      {!selected_block && <Intro />}
      <Grid
        id="grid"
        style={{
          '--rows-xs': selected_block ? 1 : blocks.length,
          '--rows-m': selected_block ? 1 : Math.ceil(blocks.length / 2.33),
          '--rows-s': selected_block ? 1 : Math.ceil(blocks.length / 1.5),
          '--rows-l': selected_block ? 1 : Math.ceil(blocks.length / 3),
        }}
      >
        {blocks.map((block, index) => (
          <Block
            key={index}
            block={block}
            index={index}
            hovered_block={hovered_block}
            set_hovered_block={set_hovered_block}
            selected_block={selected_block}
            set_selected_block={set_selected_block}
            scroll_top={scroll_top}
            set_scroll_top={set_scroll_top}
          />
        ))}
      </Grid>

      <PreviousButton
        hovered_block={hovered_block}
        set_hovered_block={set_hovered_block}
      />

      <NextButton
        hovered_block={hovered_block}
        set_hovered_block={set_hovered_block}
      />
    </Fragment>
  )
}

const PreviousButton = ({ hovered_block, set_hovered_block }) => {
  if (!hovered_block) return null

  const block_1_hovered = hovered_block === 1
  const bg_opacity = block_1_hovered ? 1 : 0.4

  return (
    <ButtonWrapper
      t0
      style={{
        height: 'calc((100% - 100vw) / 2)',
        background: `linear-gradient(rgba(255, 255, 255, ${bg_opacity}), transparent)`,
        backdropFilter: block_1_hovered ? '' : 'blur(4px)',
      }}
    >
      <Button
        onClick={(event) => {
          const prev_block = hovered_block - 1
          if (block_1_hovered) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            scroll_to(event, `section-${prev_block}`)
          }
          set_hovered_block(prev_block)
        }}
      >
        {block_1_hovered ? 'Back to top' : 'Previous'}
      </Button>
    </ButtonWrapper>
  )
}

const NextButton = ({ hovered_block, set_hovered_block }) => {
  if (hovered_block === blocks.length) return null

  const no_block_hovered = hovered_block === 0
  const bg_opacity = no_block_hovered && no_block_hovered ? 1 : 0.4

  return (
    <ButtonWrapper
      b0
      style={{
        height: 'calc((100% - 100vw) / 2)',
        background: `linear-gradient(transparent, rgba(255, 255, 255, ${bg_opacity}))`,
        backdropFilter: no_block_hovered ? '' : 'blur(4px)',
      }}
    >
      <Button
        onClick={(event) => {
          const next_block = hovered_block + 1
          scroll_to(event, `section-${next_block}`)
          set_hovered_block(next_block)
        }}
      >
        {no_block_hovered ? 'Start!' : 'Next'}
      </Button>
    </ButtonWrapper>
  )
}

// assign a random color to each block
const blocks = blocks_list.map((component, index) => {
  const hue = random(0, 360)
  const saturation = index % 2 ? random(40, 75) : random(10, 80)
  const luminosity = index % 2 ? random(40, 90) : random(15, 85)
  const color = `hsl(${hue}, ${saturation}%, ${luminosity}%)`
  return { component, color: { value: color, hue, saturation, luminosity } }
})

const Grid = Component.no_select.w100vw.div()
const ButtonWrapper =
  Component.none__d.flex.ai_center.jc_center.zi10.w100vw.fixed.div()
const Button =
  Component.no_select.shadow_a_l.w50p.bg_white.ph20.pv10.c_pointer.text_center.fs25.b_rad50.div()

export default App
