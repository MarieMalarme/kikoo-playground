import { atomizify, flagify } from 'atomizify'

atomizify({
  custom_classes: {
    minH100vh: 'min-height: 100vh',
  },
})

export const { Component, Div } = flagify()
