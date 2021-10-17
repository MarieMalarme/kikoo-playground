import { atomizify, flagify } from 'atomizify'

atomizify({
  custom_classes: {
    minH100vh: 'min-height: 100vh',
    no_select: 'user-select: none',
    fs4vw: 'font-size: 4vw',
    sans: 'font-family: "sans"',
    mono: 'font-family: "mono"',
  },
})

export const { Component, Div } = flagify()
export const Section = Component.section()
