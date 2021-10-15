import { Component } from './utils/flags'
import { random } from './utils/toolbox'
import { Block_1 } from './blocks/Block_1'
import { Block_2 } from './blocks/Block_2'
import { Block_3 } from './blocks/Block_3'
import { Block_4 } from './blocks/Block_4'
import { Block_5 } from './blocks/Block_5'
import { Block_6 } from './blocks/Block_6'
import { Block_7 } from './blocks/Block_7'
import { Block_8 } from './blocks/Block_8'
import { Block_9 } from './blocks/Block_9'

const App = () => (
  <Grid id="grid">
    {blocks.map(({ block, color }, index) => {
      const Block = block
      return (
        <Block key={index} color={color} style={{ background: color.value }} />
      )
    })}
  </Grid>
)

const blocks = [
  Block_1,
  Block_2,
  Block_3,
  Block_4,
  Block_5,
  Block_6,
  Block_7,
  Block_8,
  Block_9,
].map((block, index) => {
  const hue = random(0, 360)
  const saturation = index % 2 ? random(40, 75) : random(10, 80)
  const luminosity = index % 2 ? random(40, 90) : random(15, 85)
  const color = `hsl(${hue}, ${saturation}%, ${luminosity}%)`
  return { block, color: { value: color, hue, saturation, luminosity } }
})

const Grid = Component.w100vw.minH100vh.div()

export default App
