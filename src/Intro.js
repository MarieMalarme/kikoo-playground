import { Component } from './utils/flags'
import { Upsize, Tags } from './icons'

export const Intro = () => (
  <Presentation>
    Kikoo Playground — A set of interactive blocks to draw, play, write,
    animate...
    <Line mt20>
      <Icon icon="upsize" />
      Enter & exit full screen mode for a block
    </Line>
    <Line mt5>
      <Icon icon="tags" />
      Show & hide the source code of a block
    </Line>
  </Presentation>
)

const Icon = ({ icon }) => {
  const Component = icons[icon]

  return (
    <Component
      ba
      bw2
      mr15
      width={30}
      stroke="black"
      stroke_width={icon === 'tags' ? 13 : 15}
      style={{
        marginBottom: '-5px',
        padding: icon === 'upsize' ? '6px' : '4.5px',
      }}
    />
  )
}

const icons = { tags: Tags, upsize: Upsize }

const Presentation =
  Component.bw2.b_grey8.bb.lh33.w100vw.ph50.pv45.sans.fs30.div()
const Line = Component.p()
