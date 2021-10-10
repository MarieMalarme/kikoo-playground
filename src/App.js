import { Component, Div } from './utils/flags'
import { random } from './utils/toolbox'

const App = () => (
  <Page id="grid">
    {sections.map(({ hue, saturation, luminosity }, index) => (
      <Div
        style={{ background: `hsl(${hue}, ${saturation}%, ${luminosity}%)` }}
      />
    ))}
  </Page>
)

const sections = [...Array(39).keys()].map((index) => ({
  hue: random(0, 1000),
  saturation: index % 2 ? random(40, 75) : random(10, 80),
  luminosity: index % 2 ? random(40, 90) : random(15, 85),
}))

const Page = Component.w100vw.minH100vh.div()

export default App
