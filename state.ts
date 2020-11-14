import { Dispatch as ReactDispatch, Reducer, createContext } from 'react'
import {
  eligibleTitles,
  Milestone,
  MilestoneMap,
  NoteMap,
  TrackId,
  trackIds,
} from './constants'

export interface SnowflakeAppState {
  notesByTrack: NoteMap
  milestoneByTrack: MilestoneMap
  name: string
  title: string
  focusedTrackId: TrackId
}

export const emptyState = (): SnowflakeAppState => {
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

export const defaultState = (): SnowflakeAppState => {
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

type Action =
  | ActionReset
  | ActionImportFromHash
  | ActionImportFromSheet
  | ActionShiftFocusedTrack
  | ActionSetFocusedTrack
  | ActionShiftFocusedTrackMilestone
  | ActionSetName
  | ActionSetTitle
  | ActionTrackMilestoneChange
  | ActionTrackNoteChange

type ActionReset = ['Reset']

type ActionImportFromHash = ['ImportFromHash', string]

type ActionImportFromSheet = [
  'ImportFromSheet',
  {
    name: string
    title: string
    milestones: Milestone[]
    notes: string[]
  }
]

type ActionShiftFocusedTrack = ['ShiftFocusedTrack', number]

type ActionSetFocusedTrack = ['SetFocusedTrack', TrackId]

type ActionShiftFocusedTrackMilestone = ['ShiftFocusedTrackMilestone', number]

type ActionSetName = ['SetName', string]

type ActionSetTitle = ['SetTitle', string]

type ActionTrackMilestoneChange = [
  'TrackMilestoneChange',
  { trackId: TrackId; milestone: Milestone }
]

type ActionTrackNoteChange = [
  'TrackNoteChange',
  { trackId: TrackId; note: string }
]

export type Dispatch = ReactDispatch<Action>

export const Context = createContext<Dispatch>(() => {})

export const reducer: Reducer<SnowflakeAppState, Action> = (state, action) => {
  switch (action[0]) {
    case 'Reset':
      return emptyState()

    case 'ImportFromHash': {
      const hash = action[1]
      const newState = hashToState(hash)
      if (newState) {
        return newState
      } else {
        return defaultState()
      }
    }

    case 'ImportFromSheet': {
      const { name, title, milestones, notes } = action[1]
      const milestoneByTrack = {} as MilestoneMap
      milestones.forEach((milestone, i) => {
        milestoneByTrack[trackIds[i]] = milestone
      })
      const notesByTrack = {} as NoteMap
      notes.forEach((note, i) => {
        notesByTrack[trackIds[i]] = note
      })
      return {
        ...state,
        name,
        title,
        milestoneByTrack,
        notesByTrack,
      }
    }

    case 'ShiftFocusedTrack': {
      const delta = action[1]
      let index = trackIds.indexOf(state.focusedTrackId)
      index += delta + trackIds.length
      const focusedTrackId = trackIds[index % trackIds.length]
      return {
        ...state,
        focusedTrackId,
      }
    }

    case 'SetFocusedTrack': {
      const trackId = action[1]
      const index = trackIds.indexOf(trackId)
      const focusedTrackId = trackIds[index]
      return {
        ...state,
        focusedTrackId,
      }
    }

    case 'ShiftFocusedTrackMilestone': {
      const delta = action[1]
      const prevMilestone = state.milestoneByTrack[state.focusedTrackId]
      const milestone = coerceMilestone(prevMilestone + delta)

      const milestoneByTrack = {
        ...state.milestoneByTrack,
        [state.focusedTrackId]: milestone,
      }
      const titles = eligibleTitles(milestoneByTrack)
      const title = titles.indexOf(state.title) === -1 ? titles[0] : state.title

      return {
        ...state,
        milestoneByTrack,
        title,
      }
    }

    case 'SetName':
      return {
        ...state,
        name: action[1],
      }

    case 'SetTitle': {
      let title = action[1]
      const titles = eligibleTitles(state.milestoneByTrack)
      title = titles.indexOf(title) < 0 ? titles[0] : title
      return {
        ...state,
        title,
      }
    }

    case 'TrackMilestoneChange': {
      const { trackId, milestone } = action[1]
      const milestoneByTrack = {
        ...state.milestoneByTrack,
        [trackId]: milestone,
      }

      const titles = eligibleTitles(milestoneByTrack)
      const title = titles.indexOf(state.title) === -1 ? titles[0] : state.title

      return {
        ...state,
        milestoneByTrack,
        title,
        focusedTrackId: trackId,
      }
    }

    case 'TrackNoteChange': {
      const { trackId, note } = action[1]
      return {
        ...state,
        notesByTrack: {
          ...state.notesByTrack,
          [trackId]: note,
        },
      }
    }
  }
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
  if (value >= 0 && value <= 5) {
    return value as Milestone
  }
  return 0
}
