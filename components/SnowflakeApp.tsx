import React from 'react'
import type { Milestone, MilestoneMap, NoteMap, TrackId } from '../constants'
import { eligibleTitles, trackIds } from '../constants'

import KeyboardListener from './KeyboardListener'
import LevelThermometer from './LevelThermometer'
import NightingaleChart from './NightingaleChart'
import PointSummaries from './PointSummaries'
import SheetsControl from './SheetsControl'
import TitleSelector from './TitleSelector'
import Track from './Track'
import TrackSelector from './TrackSelector'
import Wordmark from './Wordmark'

interface SnowflakeAppState {
  notesByTrack: NoteMap
  milestoneByTrack: MilestoneMap
  name: string
  title: string
  focusedTrackId: TrackId
}

const hashToState = (hash: string): SnowflakeAppState | null => {
  if (!hash) return null
  const result = defaultState()
  const hashValues = hash.split('#')[1].split(',')
  if (!hashValues) return null
  trackIds.forEach((trackId, i) => {
    result.milestoneByTrack[trackId] = coerceMilestone(Number(hashValues[i]))
  })
  if (hashValues[16]) result.name = decodeURI(hashValues[16])
  if (hashValues[17]) result.title = decodeURI(hashValues[17])
  return result
}

const coerceMilestone = (value: number): Milestone => {
  // HACK I know this is goofy but i'm dealing with flow typing
  switch (value) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 2
    case 3:
      return 3
    case 4:
      return 4
    case 5:
      return 5
    default:
      return 0
  }
}

const emptyState = (): SnowflakeAppState => {
  return {
    name: 'Enter Your Name Here',
    title: '',
    milestoneByTrack: {
      MOBILE: 0,
      WEB_CLIENT: 0,
      'FOUNDATIONS (PLATFORM)': 0,
      'SERVERS & API': 0,
      PROJECT_MANAGEMENT: 0,
      COMMUNICATION: 0,
      CRAFT: 0,
      INITIATIVE: 0,
      CAREER_DEVELOPMENT: 0,
      ORG_DESIGN: 0,
      WELLBEING: 0,
      ACCOMPLISHMENT: 0,
      MENTORSHIP: 0,
      EVANGELISM: 0,
      RECRUITING: 0,
      COMMUNITY: 0,
    },
    notesByTrack: {},
    focusedTrackId: 'MOBILE',
  }
}

const defaultState = (): SnowflakeAppState => {
  return {
    name: 'Cersei Lannister',
    title: 'Staff Engineer',
    milestoneByTrack: {
      MOBILE: 1,
      WEB_CLIENT: 2,
      'FOUNDATIONS (PLATFORM)': 3,
      'SERVERS & API': 2,
      PROJECT_MANAGEMENT: 4,
      COMMUNICATION: 1,
      CRAFT: 1,
      INITIATIVE: 4,
      CAREER_DEVELOPMENT: 3,
      ORG_DESIGN: 2,
      WELLBEING: 0,
      ACCOMPLISHMENT: 4,
      MENTORSHIP: 2,
      EVANGELISM: 2,
      RECRUITING: 3,
      COMMUNITY: 0,
    },
    notesByTrack: {},
    focusedTrackId: 'MOBILE',
  }
}

const stateToHash = (state: SnowflakeAppState) => {
  if (!state || !state.milestoneByTrack) return null
  const values = trackIds
    .map(trackId => String(state.milestoneByTrack[trackId]))
    .concat(encodeURI(state.name), encodeURI(state.title))
  return values.join(',')
}

class SnowflakeApp extends React.Component<{}, SnowflakeAppState> {
  constructor(props: {}) {
    super(props)
    this.state = emptyState()
  }

  public componentDidUpdate() {
    const hash = stateToHash(this.state)
    if (hash) window.location.replace(`#${hash}`)
  }

  public componentDidMount() {
    const state = hashToState(window.location.hash)
    if (state) {
      this.setState(state)
    } else {
      this.setState(defaultState())
    }
  }

  public render() {
    return (
      <main>
        <style jsx global>{`
          body {
            font-family: Helvetica;
          }
          main {
            width: 960px;
            margin: 0 auto;
          }
          .name-input {
            border: none;
            display: block;
            border-bottom: 2px solid #fff;
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
            width: 380px;
            margin-bottom: 10px;
          }
          .name-input:hover,
          .name-input:focus {
            border-bottom: 2px solid #ccc;
            outline: 0;
          }
          a {
            color: #888;
            text-decoration: none;
          }
        `}</style>
        <div style={{ margin: '19px auto 0', width: 142 }}>
          <a href="https://vendhq.com/" target="_blank" rel="noreferrer">
            <Wordmark />
          </a>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <form>
              <input
                type="text"
                className="name-input"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="Name"
              />
              <SheetsControl
                name={this.state.name}
                title={this.state.title}
                onImport={this.handleSheetsImport}
                milestoneByTrack={this.state.milestoneByTrack}
                notesByTrack={this.state.notesByTrack}
              />
              <TitleSelector
                milestoneByTrack={this.state.milestoneByTrack}
                currentTitle={this.state.title}
                setTitleFn={title => this.setTitle(title)}
              />
            </form>
            <PointSummaries milestoneByTrack={this.state.milestoneByTrack} />
            <LevelThermometer milestoneByTrack={this.state.milestoneByTrack} />
          </div>
          <div style={{ flex: 0 }}>
            <NightingaleChart
              milestoneByTrack={this.state.milestoneByTrack}
              focusedTrackId={this.state.focusedTrackId}
              handleTrackMilestoneChangeFn={(track, milestone) =>
                this.handleTrackMilestoneChange(track, milestone)
              }
            />
          </div>
        </div>
        <TrackSelector
          milestoneByTrack={this.state.milestoneByTrack}
          focusedTrackId={this.state.focusedTrackId}
          setFocusedTrackIdFn={this.setFocusedTrackId}
        />
        <KeyboardListener
          selectNextTrackFn={() => this.shiftFocusedTrack(1)}
          selectPrevTrackFn={() => this.shiftFocusedTrack(-1)}
          increaseFocusedMilestoneFn={() =>
            this.shiftFocusedTrackMilestoneByDelta(1)
          }
          decreaseFocusedMilestoneFn={() =>
            this.shiftFocusedTrackMilestoneByDelta(-1)
          }
        />
        <Track
          milestoneByTrack={this.state.milestoneByTrack}
          notesByTrack={this.state.notesByTrack}
          trackId={this.state.focusedTrackId}
          handleTrackMilestoneChangeFn={(track, milestone) =>
            this.handleTrackMilestoneChange(track, milestone)
          }
          handleTrackNoteChangeFn={(track, note) =>
            this.handleTrackNoteChange(track, note)
          }
        />
        <div style={{ display: 'flex', paddingBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={() => this.setState(emptyState())}>
              Reset
            </a>
          </div>
          <div style={{ flex: 5 }}>
            Forked from{' '}
            <a
              href="https://medium.engineering"
              target="_blank"
              rel="noreferrer"
            >
              Medium Eng
            </a>
            . Learn about the{' '}
            <a
              href="https://medium.com/s/engineering-growth-framework"
              target="_blank"
              rel="noreferrer"
            >
              growth framework
            </a>
            . Get the{' '}
            <a
              href="https://github.com/Medium/snowflake"
              target="_blank"
              rel="noreferrer"
            >
              source code
            </a>
            . Read the{' '}
            <a
              href="https://medium.com/p/85e078bc15b7"
              target="_blank"
              rel="noreferrer"
            >
              terms of service
            </a>
            .
          </div>
        </div>
      </main>
    )
  }

  private handleSheetsImport = (
    name: string,
    title: string,
    milestones: Milestone[],
    notes: string[]
  ) => {
    const milestoneByTrack = {} as MilestoneMap
    milestones.forEach((milestone, i) => {
      milestoneByTrack[trackIds[i]] = milestone
    })
    const notesByTrack = {} as NoteMap
    notes.forEach((note, i) => {
      notesByTrack[trackIds[i]] = note
    })
    this.setState({ name, title, milestoneByTrack, notesByTrack })
  }

  private handleTrackMilestoneChange(trackId: TrackId, milestone: Milestone) {
    const milestoneByTrack = this.state.milestoneByTrack
    milestoneByTrack[trackId] = milestone

    const titles = eligibleTitles(milestoneByTrack)
    const title =
      titles.indexOf(this.state.title) === -1 ? titles[0] : this.state.title

    this.setState({ milestoneByTrack, focusedTrackId: trackId, title })
  }

  private handleTrackNoteChange(trackId: TrackId, note: string) {
    const notesByTrack = Object.assign({}, this.state.notesByTrack)
    notesByTrack[trackId] = note

    this.setState({ notesByTrack })
  }

  private shiftFocusedTrack(delta: number) {
    let index = trackIds.indexOf(this.state.focusedTrackId)
    index = (index + delta + trackIds.length) % trackIds.length
    const focusedTrackId = trackIds[index]
    this.setState({ focusedTrackId })
  }

  private setFocusedTrackId = (trackId: TrackId) => {
    const index = trackIds.indexOf(trackId)
    const focusedTrackId = trackIds[index]
    this.setState({ focusedTrackId })
  }

  private shiftFocusedTrackMilestoneByDelta(delta: number) {
    const prevMilestone = this.state.milestoneByTrack[this.state.focusedTrackId]
    const milestone = prevMilestone + delta
    this.handleTrackMilestoneChange(
      this.state.focusedTrackId,
      coerceMilestone(milestone)
    )
  }

  private setTitle(title: string) {
    const titles = eligibleTitles(this.state.milestoneByTrack)
    title = titles.indexOf(title) < 0 ? titles[0] : title
    this.setState({ title })
  }
}

export default SnowflakeApp