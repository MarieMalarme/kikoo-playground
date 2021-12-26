import { useState, useEffect } from 'react'
import { Component } from '../utils/flags'

export const Block_35 = ({ color }) => {
  const [path, set_path] = useState(null)
  const [inc, set_inc] = useState(0)
  const [font_size, set_font_size] = useState(45)
  const [characters_amount, set_characters_amount] = useState(100)
  const [text, set_text] = useState('WoW')

  const path_length = path?.getTotalLength()
  const characters = Array(Number(characters_amount))
    .fill()
    .map((e) => text)

  useEffect(() => {
    if (!path_length) return
    set_inc(path_length * 0.6)
  }, [path_length])

  return (
    <Wrapper id="block-35">
      <Svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <path
            ref={set_path}
            id="spiral"
            d="M808.2 98c206.3 180 227.59 493.24 47.54 699.54-173.84 199.24-476.25 219.79-675.44 45.95C-12 675.63-31.87 383.65 136 191.32 298.05 5.61 580-13.55 765.68 148.52 945 305 963.48 577.22 807 756.52c-151.09 173.13-413.93 191-587.06 39.9C52.78 650.53 35.53 396.76 181.42 229.59c140.86-161.4 385.9-178 547.3-37.19 155.84 136 171.92 372.6 35.91 528.44-131.32 150.47-359.76 166-510.23 34.68-145.29-126.8-160.28-347.37-33.48-492.66 122.43-140.28 335.4-154.76 475.68-32.33 135.45 118.21 149.4 323.85 31.21 459.3C613.68 820.61 415.13 834.1 284.34 720 158.07 609.76 145 418.05 255.24 291.77c106.41-121.92 291.51-134.5 413.44-28.09 117.73 102.74 129.87 281.46 27.13 399.19-99.2 113.67-271.81 125.4-385.44 26.19-109.75-95.78-121.07-262.4-25.29-372.15 92.48-106 253.36-116.91 359.34-24.43 102.32 89.3 112.87 244.64 23.57 347-86.22 98.79-236.2 109-335 22.77C237.6 579 227.76 434.14 311 338.75c80.38-92.11 220.21-101.61 312.32-21.23 88.93 77.62 98.1 212.63 20.49 301.56-74.94 85.86-205.3 94.72-291.16 19.78-82.91-72.35-91.47-198.22-19.11-281.13 69.86-80.05 191.39-88.31 271.45-18.45 77.29 67.46 85.26 184.8 17.81 262.1a179.37 179.37 0 0 1-253.07 17.2 173.18 173.18 0 0 1-16.6-244.35 167.21 167.21 0 0 1 235.92-16A161.46 161.46 0 0 1 604.55 586a155.89 155.89 0 0 1-219.95 14.94 150.51 150.51 0 0 1-14.44-212.37 145.34 145.34 0 0 1 205.06-13.93 140.32 140.32 0 0 1 13.45 198 135.49 135.49 0 0 1-191.16 13A130.82 130.82 0 0 1 385 401a126.31 126.31 0 0 1 178.22-12.11A122 122 0 0 1 574.88 561a117.76 117.76 0 0 1-166.15 11.3 113.7 113.7 0 0 1-10.91-160.43 109.79 109.79 0 0 1 154.9-10.53 106 106 0 0 1 10.17 149.57 102.35 102.35 0 0 1-144.41 9.81A98.82 98.82 0 0 1 409 421.29a95.41 95.41 0 0 1 134.63-9.15 92.13 92.13 0 0 1 8.84 130A89 89 0 0 1 427 550.66a85.89 85.89 0 0 1-8.23-121.19 82.92 82.92 0 0 1 117-8"
          />
        </defs>
        <Text fontSize={font_size} textAnchor="middle" fill={color.value}>
          <textPath startOffset={inc} xlinkHref="#spiral">
            {characters.map((number, index) => (
              <tspan
                key={index}
                style={{ opacity: (1 * index) / characters.length + 0.05 }}
              >
                {number}
              </tspan>
            ))}
          </textPath>
        </Text>
      </Svg>
      <Inputs>
        <Label>font-size:</Label>
        <Input
          type="range"
          value={font_size}
          min={30}
          max={100}
          onInput={(event) => set_font_size(event.target.value)}
        />
        <Label mt20>text-offset:</Label>
        <Input
          type="range"
          value={inc}
          min={0}
          max={path_length}
          onInput={(event) => set_inc(event.target.value)}
        />
        <Label mt20>characters:</Label>
        <Input
          type="range"
          value={characters_amount}
          min={100}
          max={300}
          onInput={(event) => set_characters_amount(event.target.value)}
        />
        <Test>
          <Label mr5>text:</Label>
          <TextInput
            placeholder="Type here!"
            type="text"
            value={text}
            onInput={(event) => set_text(event.target.value)}
          />
        </Test>
      </Inputs>
    </Wrapper>
  )
}

const Wrapper = Component.pa30.flex.flex_column.ai_center.jc_center.article()
const Svg = Component.of_visible.svg()
const Text = Component.ls10.f_invert100.text()
const Inputs = Component.absolute.b20.ph25.flex.flex_column.w100p.div()
const Input = Component.input()
const Test = Component.flex.mt20.w30p.bb.ai_baseline.div()
const TextInput = Component.ol_none.bg_none.ba0.w100p.input()
const Label = Component.fs14.mb5.label()
