import { atomizify, flagify } from 'atomizify'

atomizify({
  custom_classes: {
    no_select: 'user-select: none',
    fs2vw: 'font-size: 2vw',
    fs4vw: 'font-size: 4vw',
    fs9vw: 'font-size: 9vw',
    fs12vw: 'font-size: 12vw',
    fs20vw: 'font-size: 20vw',
    fs30vw: 'font-size: 30vw',
    lh33: 'line-height: 33px',
    lh35: 'line-height: 35px',
    lh10vw: 'line-height: 10vw',
    lh22vw: 'line-height: 22vw',
    lh100vh: 'line-height: 100vh',
    sans: 'font-family: "sans"',
    mono: 'font-family: "mono"',
    sun_moon: 'font-family: "sun-moon"',
    ml7: 'margin-left: 7px',
    fit_cover: 'object-fit: cover',
    w15vmin: 'width: 15vmin',
    h15vmin: 'height: 15vmin',
    b_rad50: 'border-radius: 50px',
  },

  media_queries: {
    // to review
    __xs: {
      query: 'max-width: 600px',
      description: 'small screens',
    },
    __s: {
      query: 'max-width: 900px',
      description: 'extra small screens',
    },
    __d: {
      query: 'min-width: 600px',
      description: 'desktop screens',
    },
  },
})

export const { Component, Div } = flagify()

// create custom cursors: cursor is an icon of the needed interaction (mouse scrolling, etc.)
