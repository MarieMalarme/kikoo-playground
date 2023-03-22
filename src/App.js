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
  const background = block_1_hovered && 'linear-gradient(white, transparent)'

  return (
    <ButtonWrapper
      t0
      style={{ height: 'calc((100vh - 100vw) / 2)', background }}
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
  const background = no_block_hovered && 'linear-gradient(transparent, white)'

  return (
    <ButtonWrapper
      b0
      style={{ height: 'calc((100vh - 100vw) / 2)', background }}
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
  Component.no_select.ol_none.shadow_a_l.w50p.bg_white.ph20.pv10.c_pointer.ba0.sans.fs25.b_rad50.button()

export default App
