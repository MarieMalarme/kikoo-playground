import { useState } from 'react'
import { random } from '../utils/toolbox'
import { Component, Div } from '../utils/flags'

export const Block_77 = ({ color }) => {
  const [inc, set_inc] = useState(0)
  const [start_inc, set_start_inc] = useState(30)
  const [font_size, set_font_size] = useState(20)
  const [selected_characters, set_selected_characters] = useState({
    1: characters_list[0],
  })

  const characters_array = Object.entries(selected_characters)

  return (
    <Wrapper>
      <Lines
        style={{
          fontSize: `${font_size}px`,
          backgroundColor: 'mediumblue',
          color: 'orange',
        }}
      >
        {lines.map((line_index) => (
          <Line key={line_index} style={{ height: `calc(100% / ${amount})` }}>
            {letters.map((index) => {
              const start_angle = line_index * start_inc
              const angle = index * (180 / amount) + inc
              const rotation = start_angle + angle
              const transform = `rotateY(${rotation}deg)`
              const width = `calc(100% / ${amount * 2 + 1})`
              return (
                <Character key={index} style={{ transform, width }}>
                  {characters_array[line_index % characters_array.length][1]}
                </Character>
              )
            })}
          </Line>
        ))}
      </Lines>

      <Controls>
        <Inputs flex flex_column>
          <Label>Rotation angle</Label>
          <Input
            min={0}
            max={360 * 2}
            type="range"
            name="rotation angle"
            defaultValue={inc}
            className="range-input-thin"
            onInput={(event) => set_inc(Number(event.target.value))}
          />

          <Label>Angle shift</Label>
          <Input
            min={0}
            max={180}
            type="range"
            name="shifted angle"
            defaultValue={start_inc}
            className="range-input-thin"
            onInput={(event) => set_start_inc(Number(event.target.value))}
          />

          <Label>Font size</Label>
          <Input
            min={10}
            max={40}
            type="range"
            name="font size"
            defaultValue={font_size}
            className="range-input-thin"
            onInput={(event) => set_font_size(Number(event.target.value))}
          />
        </Inputs>

        <Buttons>
          {characters_array.map(([id, character]) => (
            <Div key={id} mb5 w100p flex ai_center jc_between>
              <Select
                onChange={(event) =>
                  set_selected_characters({
                    ...selected_characters,
                    [id]: event.target.value,
                  })
                }
                defaultValue={character}
              >
                {characters_list.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
              <Button
                ba0
                text_right
                ph5={false}
                disabled={characters_array.length === 1}
                onClick={() => {
                  if (characters_array.length === 1) return
                  set_selected_characters(
                    Object.fromEntries(
                      characters_array.filter(([char_id]) => char_id !== id),
                    ),
                  )
                }}
              >
                Remove
              </Button>
            </Div>
          ))}

          <Button
            mt5
            b_grey5={characters_array.length < 5}
            b_grey2={characters_array.length === 5}
            disabled={characters_array.length === 5}
            onClick={() =>
              set_selected_characters({
                ...selected_characters,
                [Math.max(...characters_array.map(([id]) => id)) + 1]:
                  characters_list[random(0, characters_list.length - 1)],
              })
            }
          >
            Add character
          </Button>
        </Buttons>
      </Controls>
    </Wrapper>
  )
}

const amount = 30
const lines = [...Array(amount).keys()]
const letters = [...Array(amount * 2 + 1).keys()]
const characters_list = ['✧', '❋', '✺', '✴', '❈', '✷', '✩']

const Wrapper = Component.article()
const Lines =
  Component.mono.zi1.w100p.h100p.flex.flex_column.ai_center.jc_center.div()
const Line = Component.relative.w100p.h30p.flex.ai_center.jc_center.div()
const Character = Component.flex.ai_center.jc_center.h100p.div()
const Controls =
  Component.b_rad4.bg_white.zi2.absolute.l20.t20.w20p.w125__xs.ph20.pb20.pt10.div()
const Inputs = Component.div()
const Label = Component.mb7.fs11.div()
const Input = Component.w100p.mb15.input()
const Buttons = Component.mt10.w100p.flex.flex_wrap.jc_between.div()
const Button =
  Component.w100p.h20.c_pointer.b_rad2.ba.ph5.sans.fs11.bg_none.button()
const Select = Component.w60p.ol_none.h20.select()
