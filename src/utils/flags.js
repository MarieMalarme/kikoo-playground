import { atomizify, flagify } from 'atomizify'

atomizify({
  custom_classes: {
    minH100vh: 'min-height: 100vh',
    no_select: 'user-select: none',
    mono: 'font-family: monospace',
  },
})

export const { Component, Div } = flagify()
export const Section = Component.section()
