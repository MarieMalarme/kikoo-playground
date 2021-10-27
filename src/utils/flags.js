import { atomizify, flagify } from 'atomizify'

atomizify({
  custom_classes: {
    no_select: 'user-select: none',
    fs2vw: 'font-size: 2vw',
    fs4vw: 'font-size: 4vw',
    fs12vw: 'font-size: 12vw',
    fs20vw: 'font-size: 20vw',
    lh22vw: 'line-height: 22vw',
    sans: 'font-family: "sans"',
    mono: 'font-family: "mono"',
    sun_moon: 'font-family: "sun-moon"',
    ml7: 'margin-left: 7px',
    fit_cover: 'object-fit: cover',
    w15vmin: 'width: 15vmin',
    h15vmin: 'height: 15vmin',
  },
})

export const { Component, Div } = flagify()
export const Section = Component.section()

// create custom cursors: cursor is an icon of the needed interaction (mouse scrolling, etc.)
