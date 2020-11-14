import React from 'react'
import { tracks, milestones, categoryColorScale } from '../constants'
import type { MilestoneMap, NoteMap, TrackId, Milestone } from '../constants'

interface Props {
  milestoneByTrack: MilestoneMap
  notesByTrack: NoteMap
  trackId: TrackId
  handleTrackMilestoneChangeFn: (trackId: TrackId, milestone: Milestone) => void
  handleTrackNoteChangeFn: (trackId: TrackId, note: string) => void
}

class Track extends React.Component<Props> {
  public render() {
    const track = tracks[this.props.trackId]
    const currentMilestoneId = this.props.milestoneByTrack[this.props.trackId]
    const currentMilestone = track.milestones[currentMilestoneId - 1]
    const currentNotes = this.props.notesByTrack[this.props.trackId] || ''
    return (
      <div className="track">
        <style jsx>{`
          div.track {
            margin: 0 0 20px 0;
            padding-bottom: 20px;
            border-bottom: 2px solid #ccc;
          }
          h2 {
            margin: 0 0 10px 0;
          }
          .track-description {
            margin-top: 0;
            border-bottom: 2px solid #ccc;
          }
          table {
            border-spacing: 3px;
          }
          td {
            line-height: 50px;
            width: 50px;
            text-align: center;
            background: #eee;
            font-weight: bold;
            font-size: 24px;
            border-radius: 3px;
            cursor: pointer;
          }
          ul {
            line-height: 1.5em;
          }
        `}</style>
        <h2>{track.displayName}</h2>
        <div className="track-description">
          <p>
            <em>{track.summary}</em>
          </p>
          {track.description ? <p>{track.description}</p> : null}
        </div>
        <div style={{ display: 'flex' }}>
          <table style={{ flex: 0, marginRight: 50 }}>
            <tbody>
              {milestones
                .slice()
                .reverse()
                .map(milestone => {
                  const isMet = milestone <= currentMilestoneId
                  return (
                    <tr key={milestone}>
                      <td
                        onClick={() =>
                          this.props.handleTrackMilestoneChangeFn(
                            this.props.trackId,
                            milestone as Milestone
                          )
                        }
                        style={{
                          border: `4px solid ${
                            milestone === currentMilestoneId
                              ? '#000'
                              : isMet
                              ? categoryColorScale(track.category)
                              : '#eee'
                          }`,
                          background: isMet
                            ? categoryColorScale(track.category)
                            : undefined,
                        }}
                      >
                        {milestone}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          {currentMilestone ? (
            <div style={{ flex: 1 }}>
              <h3>{currentMilestone.summary}</h3>
              <h4>Example behaviors:</h4>
              <ul>
                {currentMilestone.signals.map((signal, i) => (
                  <li key={i}>{signal}</li>
                ))}
              </ul>
              <h4>Example tasks:</h4>
              <ul>
                {currentMilestone.examples.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex' }}>
          <textarea
            style={{ flex: 1 }}
            rows={10}
            value={currentNotes}
            onChange={e =>
              this.props.handleTrackNoteChangeFn(
                this.props.trackId,
                e.currentTarget.value
              )
            }
          />
        </div>
      </div>
    )
  }
}

export default Track
