import { Fragment, useState } from 'react'
import { Component } from '../utils/flags'
import sk_files from '../data/sk_files.json'

export const Block_18 = ({ color, ...props }) => {
  const [wrapper, set_wrapper] = useState(null)

  return (
    <Wrapper elemRef={set_wrapper} {...props}>
      {wrapper && (
        <KillersDataviz data={sk_files} wrapper={wrapper} color={color.value} />
      )}
      <Title>
        Amount of
        <br />
        active serial killers
        <br />
        per year in the world
      </Title>
    </Wrapper>
  )
}

const KillersDataviz = ({ data, wrapper, color }) => {
  // get all the indexed active years in the data
  const years_index = data
    .map((killer) => killer.active_years.map((year) => year))
    .flat()

  const oldest_year = Math.min(...years_index)

  // create a range covering each year of the period
  // from the oldest year found in the data to today's current year
  const years_range = Array(current_year - oldest_year + 1)
    .fill(oldest_year)
    .map((min, i) => min + i)

  // create an object with all the years of the range
  // with the year as the key & the killers' list as the value
  const killers_per_year = Object.fromEntries(
    years_range.map((year) => {
      const year_killers = data.filter((killer) => {
        const [activity_beginning, activity_end] = killer.active_years
        return year >= activity_beginning && year <= activity_end
      })
      return [year, year_killers]
    }),
  )

  const max_killers_per_year = Math.max(
    ...Object.values(killers_per_year).map((killers) => killers.length),
  )

  // find the year with the highest amount of active killers
  // to set is as the default hovered line
  const highest_killers_year = Object.entries(killers_per_year).find(
    ([year, killers]) => killers.length === max_killers_per_year,
  )

  const [hovered_line, set_hovered_line] = useState({
    year: highest_killers_year[0],
    killers: highest_killers_year[1],
  })

  const { width, height } = wrapper.getBoundingClientRect()
  const year_line_chunk = width / (years_range.length - 1)

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <Year textAnchor="start" fill={color} x={0} y={-10}>
        {oldest_year}
      </Year>
      <Year textAnchor="end" fill={color} x={width} y={-10}>
        {current_year}
      </Year>
      {Object.entries(killers_per_year).map(([year, killers], i) => (
        <KillersPerYearLine
          key={year}
          year={year}
          color={color}
          height={height}
          killers={killers}
          hovered_line={hovered_line}
          set_hovered_line={set_hovered_line}
          year_line_chunk={year_line_chunk}
          i={i}
        />
      ))}
    </Svg>
  )
}

const KillersPerYearLine = (props) => {
  const { year, killers, i, color, height } = props
  const { hovered_line, set_hovered_line, year_line_chunk } = props
  const is_hovered = hovered_line.year === year
  const line_coords_x = year_line_chunk * i
  const line_height = killers.length * ((height - 75) / 100)

  return (
    <Fragment>
      <line
        onMouseOver={() => set_hovered_line({ year, killers })}
        x1={line_coords_x}
        x2={line_coords_x}
        y1={0}
        y2={line_height}
        strokeWidth={9}
        stroke="transparent"
      />
      <line
        style={{ filter: 'invert(100%)' }}
        x1={line_coords_x}
        x2={line_coords_x}
        y1={0}
        y2={line_height}
        strokeWidth={is_hovered ? 9 : 1}
        stroke={color}
      />
      {is_hovered && (
        <Fragment>
          <text fontSize={25} textAnchor="middle" x={line_coords_x} y={-45}>
            {hovered_line.year}
          </text>
          <text
            fontSize={25}
            textAnchor="middle"
            x={line_coords_x}
            y={line_height + 60}
          >
            {hovered_line.killers.length}
          </text>
        </Fragment>
      )}
    </Fragment>
  )
}

const current_year = new Date().getFullYear()

const Wrapper = Component.c_crosshair.relative.of_hidden.section()
const Svg = Component.mh50.mt75.of_visible.svg()
const Year = Component.f_invert100.text()
const Title = Component.fs2vw.b50.l50.absolute.p()
