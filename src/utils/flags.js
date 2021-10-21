import { atomizify, flagify } from 'atomizify'

atomizify({
  custom_classes: {
    no_select: 'user-select: none',
    fs2vw: 'font-size: 2vw',
    fs4vw: 'font-size: 4vw',
    sans: 'font-family: "sans"',
    mono: 'font-family: "mono"',
    ml7: 'margin-left: 7px',
    fit_cover: 'object-fit: cover',
    w15vmin: 'width: 15vmin',
    h15vmin: 'height: 15vmin',
  },
})

export const { Component, Div } = flagify()
export const Section = Component.section()
