import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'
import {
  pointsToLevels,
  categoryPointsFromMilestoneMap,
  categoryColorScale,
} from '../constants'
import type { MilestoneMap } from '../constants'

const margins = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 10,
}
const height = 150
const width = 550

interface Props {
  milestoneByTrack: MilestoneMap
}

const pointScale = d3
  .scaleLinear()
  .domain([0, 135])
  .rangeRound([0, width - margins.left - margins.right])

const topAxisFn = d3
  .axisTop<string>(pointScale as any)
  .tickValues(Object.keys(pointsToLevels))
  .tickFormat(points => pointsToLevels[points])

const bottomAxisFn = d3
  .axisBottom<string>(pointScale as any)
  .scale(pointScale as any)
  .tickValues(Object.keys(pointsToLevels))

function rightRoundedRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): string {
  return (
    'M' +
    x +
    ',' +
    y +
    'h' +
    (width - radius) +
    'a' +
    radius +
    ',' +
    radius +
    ' 0 0 1 ' +
    radius +
    ',' +
    radius +
    'v' +
    (height - 2 * radius) +
    'a' +
    radius +
    ',' +
    radius +
    ' 0 0 1 ' +
    -radius +
    ',' +
    radius +
    'h' +
    (radius - width) +
    'z'
  )
}

const LevelThermometer: React.FunctionComponent<Props> = ({
  milestoneByTrack,
}) => {
  const topAxis = useRef<SVGGElement>(null)
  const bottomAxis = useRef<SVGGElement>(null)

  useEffect(() => {
    d3.select(topAxis.current)
      .call(topAxisFn as any)
      .selectAll('text')
      .attr('y', 0)
      .attr('x', -25)
      .attr('transform', 'rotate(90)')
      .attr('dy', '.35em')
      .style('font-size', '12px')
      .style('text-anchor', 'start')
    d3.select(bottomAxis.current)
      .call(bottomAxisFn as any)
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 10)
      .attr('transform', 'rotate(90)')
      .attr('dy', '.35em')
      .style('font-size', '12px')
      .style('text-anchor', 'start')
  }, [])

  const categoryPoints = categoryPointsFromMilestoneMap(milestoneByTrack)
  let lastCategoryIndex = 0
  categoryPoints.forEach((categoryPoint, i) => {
    if (categoryPoint.points) lastCategoryIndex = i
  })
  let cumulativePoints = 0
  return (
    <figure>
      <style jsx>{`
        figure {
          margin: 0 0 0 -10px;
        }
        svg {
          width: ${width}px;
          height: ${height + 10}px;
        }
      `}</style>
      <svg>
        <g transform={`translate(${margins.left},${margins.top})`}>
          {categoryPoints.map((categoryPoint, i) => {
            const x = pointScale(cumulativePoints)
            const width =
              pointScale(cumulativePoints + categoryPoint.points) - x
            cumulativePoints += categoryPoint.points
            return i !== lastCategoryIndex ? (
              <rect
                key={categoryPoint.categoryId}
                x={x}
                y={0}
                width={width}
                height={height - margins.top - margins.bottom}
                style={{
                  fill: categoryColorScale(categoryPoint.categoryId),
                  borderRight: '1px solid #000',
                }}
              />
            ) : (
              <path
                key={categoryPoint.categoryId}
                d={rightRoundedRect(
                  x,
                  0,
                  width,
                  height - margins.top - margins.bottom,
                  3
                )}
                style={{ fill: categoryColorScale(categoryPoint.categoryId) }}
              />
            )
          })}
          <g ref={topAxis} className="top-axis" transform="translate(0, -2)" />
          <g
            ref={bottomAxis}
            className="bottom-axis"
            transform={`translate(0,${
              height - margins.top - margins.bottom + 1
            })`}
          />
        </g>
      </svg>
    </figure>
  )
}

export default LevelThermometer
