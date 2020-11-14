import React, { useContext } from 'react'
import * as d3 from 'd3'
import { trackIds, milestones, tracks, categoryColorScale } from '../constants'
import type { TrackId, Milestone, MilestoneMap } from '../constants'
import { Context } from '../state'

const width = 400
const arcMilestones = milestones.slice(1) // we'll draw the '0' milestone with a circle, not an arc.

interface Props {
  milestoneByTrack: MilestoneMap
  focusedTrackId: TrackId
}

const radiusScale = d3
  .scaleBand<number>()
  .domain(arcMilestones)
  .range([0.15 * width, 0.45 * width])
  .paddingInner(0.1)

const arcFn = d3
  .arc<number>()
  .innerRadius(milestone => radiusScale(milestone)!)
  .outerRadius(milestone => radiusScale(milestone)! + radiusScale.bandwidth())
  .startAngle(-Math.PI / trackIds.length)
  .endAngle(Math.PI / trackIds.length)
  .padAngle(Math.PI / 200)
  .padRadius(0.45 * width)
  .cornerRadius(2)

const NightingaleChart: React.FunctionComponent<Props> = ({
  focusedTrackId,
  milestoneByTrack,
}) => {
  const dispatch = useContext(Context)

  const currentMilestoneId = milestoneByTrack[focusedTrackId]
  return (
    <figure>
      <style jsx>{`
        figure {
          margin: 0;
        }
        svg {
          width: ${width}px;
          height: ${width}px;
        }
        .track-milestone {
          fill: #eee;
          cursor: pointer;
        }
        .track-milestone-current,
        .track-milestone:hover {
          stroke: #000;
          stroke-width: 4px;
          stroke-linejoin: round;
        }
      `}</style>
      <svg>
        <g transform={`translate(${width / 2},${width / 2}) rotate(-33.75)`}>
          {trackIds.map((trackId, i) => {
            const isCurrentTrack = trackId === focusedTrackId
            return (
              <g
                key={trackId}
                transform={`rotate(${(i * 360) / trackIds.length})`}
              >
                {arcMilestones.map(milestone => {
                  const isCurrentMilestone =
                    isCurrentTrack && milestone === currentMilestoneId
                  const isMet =
                    milestoneByTrack[trackId] >= milestone || milestone === 0
                  return (
                    <path
                      key={milestone}
                      className={
                        'track-milestone ' +
                        (isMet ? 'is-met ' : ' ') +
                        (isCurrentMilestone ? 'track-milestone-current' : '')
                      }
                      onClick={() =>
                        dispatch([
                          'TrackMilestoneChange',
                          { trackId, milestone: milestone as Milestone },
                        ])
                      }
                      d={arcFn(milestone)!}
                      style={{
                        fill: isMet
                          ? categoryColorScale(tracks[trackId].category)
                          : undefined,
                      }}
                    />
                  )
                })}
                <circle
                  r="8"
                  cx="0"
                  cy="-50"
                  style={{
                    fill: categoryColorScale(tracks[trackId].category),
                  }}
                  className={
                    'track-milestone ' +
                    (isCurrentTrack && !currentMilestoneId
                      ? 'track-milestone-current'
                      : '')
                  }
                  onClick={() =>
                    dispatch([
                      'TrackMilestoneChange',
                      { trackId, milestone: 0 },
                    ])
                  }
                />
              </g>
            )
          })}
        </g>
      </svg>
    </figure>
  )
}

export default NightingaleChart
