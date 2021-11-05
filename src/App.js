import { useState, useEffect } from 'react'
import { Component } from './utils/flags'
import { random } from './utils/toolbox'
import { blocks_list } from './blocks/blocks'
import { Block } from './blocks/Block'

const App = () => {
  const [selected_block, set_selected_block] = useState(null)
  const [scroll_top, set_scroll_top] = useState(null)

  useEffect(() => {
    document.body.style.overflow = selected_block ? 'hidden' : 'auto'
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
    <Grid
      id="grid"
      style={{
        '--rows-amount-xs': selected_block ? 1 : blocks.length,
        '--rows-amount-m': selected_block ? 1 : Math.ceil(blocks.length / 1.5),
        '--rows-amount-l': selected_block ? 1 : Math.ceil(blocks.length / 3),
      }}
    >
      {blocks.map((block, index) => (
        <Block
          key={index}
          block={block}
          index={index}
          selected_block={selected_block}
          set_selected_block={set_selected_block}
          scroll_top={scroll_top}
          set_scroll_top={set_scroll_top}
        />
      ))}
    </Grid>
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

export default App
