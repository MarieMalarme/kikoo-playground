import { Component } from './utils/flags'
import { random } from './utils/toolbox'
import { blocks_list } from './blocks/blocks.js'

const App = () => {
  const rows_amount = Math.ceil(blocks.length / 3)
  return (
    <Grid
      id="grid"
      style={{ gridTemplateRows: `repeat(${rows_amount}, 25vw)` }}
    >
      {blocks.map(({ block, color }, index) => {
        const Block = block
        return (
          <Section
            key={index}
            name={index + 1}
            style={{ '--color-block': color.value }}
          >
            <Block color={color} />
            <Header>
              <Control>{'</>'}</Control>
              <Control>{'[ ]'}</Control>
            </Header>
          </Section>
        )
      })}
    </Grid>
  )
}

// assign a random color to each block
const blocks = blocks_list.map((block, index) => {
  const hue = random(0, 360)
  const saturation = index % 2 ? random(40, 75) : random(10, 80)
  const luminosity = index % 2 ? random(40, 90) : random(15, 85)
  const color = `hsl(${hue}, ${saturation}%, ${luminosity}%)`
  return { block, color: { value: color, hue, saturation, luminosity } }
})

const Grid = Component.no_select.w100vw.div()
const Section = Component.section()
const Header = Component.none.zi10.absolute.r10.t10.header()
const Control =
  Component.shadow_a_s.c_pointer.inline_flex.ml10.w25.h25.ba0.mono.fs11.b_rad5.button()

export default App
