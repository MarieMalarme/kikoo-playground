import { atomizify, flagify } from 'atomizify'

atomizify({
  custom_classes: {
    minH100vh: 'min-height: 100vh',
    no_select: 'user-select: none',
  },
})

export const { Component, Div } = flagify()
