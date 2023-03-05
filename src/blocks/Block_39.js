import { useState } from 'react'
import { Component } from '../utils/flags'
import monkey1 from '../images/monkey-1.jpg'
import monkey2 from '../images/monkey-2.jpg'

export const Block_39 = ({ color }) => {
  const [on, set_on] = useState(false)

  return (
    <Wrapper>
      <Image src={on ? monkey1 : monkey2} />

      <Button o50={on} l20 onClick={(event) => set_on(true)}>
        Look back
      </Button>

      <Button o50={!on} r20 onClick={(event) => set_on(false)}>
        Look away
      </Button>
    </Wrapper>
  )
}

const Wrapper = Component.flex.jc_center.article()
const Image = Component.w100p.absolute.f_saturate0.img()
const Button =
  Component.c_pointer.sans.fs17.zi2.absolute.b20.bg_indigo5.white.ba0.ph20.pv10.b_rad20.button()
