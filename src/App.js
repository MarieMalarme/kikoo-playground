import { Component, Div } from './utils/flags'
import { random } from './utils/toolbox'
import { Block_1 } from './blocks/Block_1'
import { Block_2 } from './blocks/Block_2'

const App = () => (
  <Grid id="grid">
    {blocks.map(({ block, color }, index) => {
      const Block = block
      return <Block style={{ background: color }} />
    })}
  </Grid>
)

const blocks = [Block_1, Block_2].map((block, index) => {
  const hue = random(0, 1000)
  const saturation = index % 2 ? random(40, 75) : random(10, 80)
  const luminosity = index % 2 ? random(40, 90) : random(15, 85)
  const color = `hsl(${hue}, ${saturation}%, ${luminosity}%)`
  return { block, color }
})

const Grid = Component.w100vw.minH100vh.div()

export default App
