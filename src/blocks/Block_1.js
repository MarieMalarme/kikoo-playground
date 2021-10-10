import { Component } from '../utils/flags'
import { random } from '../utils/toolbox'

export const Block_1 = (props) => (
  <Wrapper {...props}>
    <Text />
    <Text />
    <Text />
  </Wrapper>
)

const Text = () => {
  const rotation = random(0, 360)
  const scale = { x: random(2, 10), y: random(1, 6) }
  const skew = { x: random(1, 10), y: random(1, 10) }

  return (
    <Span
      style={{
        transform: `rotate(${rotation}deg) scale(${scale.x}, ${scale.y}) skew(${skew.x}deg, ${skew.y}deg)`,
      }}
    >
      Blocks
    </Span>
  )
}

const Wrapper = Component.of_hidden.flex.ai_center.jc_center.section()
const Span = Component.fs30.span()
