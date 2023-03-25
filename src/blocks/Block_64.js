import { Fragment, useState } from 'react'
import { get_invert_color } from '../utils/toolbox'
import { Component } from '../utils/flags'

export const Block_64 = ({ color }) => {
  const [selected_riddle, set_selected_riddle] = useState(0)
  const [is_blurred, set_is_blurred] = useState(true)
  const [answers, set_answers] = useState({ funny: 0, bitter: 0 })

  const inverted_color = get_invert_color(color)
  const has_finished = selected_riddle === riddles.length
  const score = answers.funny - answers.bitter

  return (
    <Wrapper style={{ color: inverted_color }}>
      {has_finished ? (
        <Result
          score={score}
          set_answers={set_answers}
          set_selected_riddle={set_selected_riddle}
          set_is_blurred={set_is_blurred}
        />
      ) : (
        <Quiz
          selected_riddle={selected_riddle}
          set_selected_riddle={set_selected_riddle}
          answers={answers}
          set_answers={set_answers}
          is_blurred={is_blurred}
          set_is_blurred={set_is_blurred}
        />
      )}

      <Graph score={score} color={inverted_color} has_finished={has_finished} />
    </Wrapper>
  )
}

const Quiz = (props) => {
  const { selected_riddle, set_selected_riddle, answers, set_answers } = props
  const { is_blurred, set_is_blurred } = props
  const { question, answer } = riddles[selected_riddle]

  return (
    <Questions>
      <div>
        <div>{question}</div>
        <Answer
          c_pointer={is_blurred}
          onClick={() => set_is_blurred(false)}
          style={{ filter: is_blurred ? 'blur(8px)' : '' }}
        >
          {answer}
        </Answer>
      </div>
      <Buttons hidden={is_blurred}>
        <Button
          onClick={() => {
            set_answers({ ...answers, bitter: answers.bitter + 1 })
            set_selected_riddle(selected_riddle + 1)
            set_is_blurred(true)
          }}
        >
          Lame...
        </Button>
        <Button
          ml15
          onClick={() => {
            set_answers({ ...answers, funny: answers.funny + 1 })
            set_selected_riddle(selected_riddle + 1)
            set_is_blurred(true)
          }}
        >
          Hahaha!
        </Button>
      </Buttons>
    </Questions>
  )
}

const Result = ({ score, ...props }) => {
  const { set_answers, set_selected_riddle, set_is_blurred } = props
  const result =
    (score === 0 && 'Neither funny nor bitter, neutral, with no personality') ||
    (score > 0 && 'Funny, happy to live, great to laugh with') ||
    (score < 0 && 'Bitter, never smiling, awkward to hang out with')

  return (
    <ResultWrapper>
      <Label>On the humour scale, you're rated as...</Label>
      <div>{result}</div>
      <Button
        mt30
        onClick={() => {
          set_answers({ funny: 0, bitter: 0 })
          set_selected_riddle(0)
          set_is_blurred(true)
        }}
      >
        Take the test again
      </Button>
    </ResultWrapper>
  )
}

const Graph = ({ color, score, has_finished }) => {
  const current_score_x = ((score + riddles.length) * 100) / riddles.length
  return (
    <GraphWrapper>
      {has_finished && (
        <Captions>
          <div>Bitter</div>
          <div>Neutral</div>
          <div>Funny</div>
        </Captions>
      )}
      <Svg width="100%" viewBox="0 0 200 5" xmlns="http://www.w3.org/2000/svg">
        <line
          x1={0}
          x2={200}
          y1={2.5}
          y2={2.5}
          stroke={color}
          strokeWidth={0.5}
        />
        <circle r={3.5} fill="white" cx={current_score_x} cy={2.5} />
        <circle r={0.75} cx={200} cy={2.5} fill={color} />
        {riddles.map((riddle, index) => {
          const x = index * (100 / riddles.length)
          return (
            <Fragment key={index}>
              <circle r={0.75} cx={x} cy={2.5} fill={color} />
              <circle r={0.75} cx={100 + x} cy={2.5} fill={color} />
            </Fragment>
          )
        })}
      </Svg>
    </GraphWrapper>
  )
}

const riddles = [
  {
    question: 'What do Alexander the Great and Winnie the Pooh have in common?',
    answer: 'Their middle names.',
  },
  {
    question: 'What is the end of everything?',
    answer: 'The letter “G”',
  },
  {
    question: 'What is red and smells like blue paint?',
    answer: 'Red paint',
  },
  {
    question: 'What word becomes shorter when you add two letters to it?',
    answer: 'Short',
  },
  {
    question: 'Which word in the dictionary is spelled incorrectly?',
    answer: 'Incorrectly',
  },
  {
    question: 'What kind of vegetable needs a plumber?',
    answer: 'A Leek',
  },
]

const Wrapper =
  Component.pa40.pa30__xs.fs30.fs26__xs.flex.flex_column.jc_between.article()
const Questions = Component.flex2.flex.flex_column.jc_between.mb15.div()
const Answer = Component.mt30.div()
const Buttons = Component.w100p.flex.jc_between.as_flex_end.div()
const Button =
  Component.fs25.fs22__xs.ba0.pv10.ph25.b_rad50.sans.bg_white.c_pointer.button()
const GraphWrapper = Component.w100p.as_flex_end.flex.flex_column.div()
const Svg = Component.of_visible.svg()
const Captions = Component.mb10.flex.w100p.fs20.jc_between.fs17__xs.div()
const ResultWrapper = Component.w100p.div()
const Label = Component.fs20.fs17__xs.mb15.div()
