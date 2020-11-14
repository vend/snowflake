import React, { useEffect, useReducer, useRef } from 'react'
import { trackIds } from '../constants'
import { SnowflakeAppState, defaultState, reducer, Context } from '../state'

import KeyboardListener from './KeyboardListener'
import LevelThermometer from './LevelThermometer'
import NightingaleChart from './NightingaleChart'
import PointSummaries from './PointSummaries'
import SheetsControl from './SheetsControl'
import TitleSelector from './TitleSelector'
import Track from './Track'
import TrackSelector from './TrackSelector'
import Wordmark from './Wordmark'

const stateToHash = (state: SnowflakeAppState) => {
  if (!state || !state.milestoneByTrack) return null
  const values = trackIds
    .map(trackId => String(state.milestoneByTrack[trackId]))
    .concat(encodeURI(state.name), encodeURI(state.title))
  return values.join(',')
}

const SnowflakeApp: React.FunctionComponent = () => {
  const firstRender = useRef(true)
  const [state, dispatch] = useReducer(reducer, null, defaultState)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      dispatch(['ImportFromHash', window.location.hash])
    } else {
      const hash = stateToHash(state)
      if (hash) {
        window.location.replace(`#${hash}`)
      }
    }
  }, [state])

  return (
    <Context.Provider value={dispatch}>
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
                value={state.name}
                onChange={e => dispatch(['SetName', e.target.value])}
                placeholder="Name"
              />
              <SheetsControl
                name={state.name}
                title={state.title}
                onImport={(name, title, milestones, notes) => {
                  dispatch([
                    'ImportFromSheet',
                    { name, title, milestones, notes },
                  ])
                }}
                milestoneByTrack={state.milestoneByTrack}
                notesByTrack={state.notesByTrack}
              />
              <TitleSelector
                milestoneByTrack={state.milestoneByTrack}
                currentTitle={state.title}
              />
            </form>
            <PointSummaries milestoneByTrack={state.milestoneByTrack} />
            <LevelThermometer milestoneByTrack={state.milestoneByTrack} />
          </div>
          <div style={{ flex: 0 }}>
            <NightingaleChart
              milestoneByTrack={state.milestoneByTrack}
              focusedTrackId={state.focusedTrackId}
            />
          </div>
        </div>
        <TrackSelector
          milestoneByTrack={state.milestoneByTrack}
          focusedTrackId={state.focusedTrackId}
        />
        <KeyboardListener />
        <Track
          milestoneByTrack={state.milestoneByTrack}
          notesByTrack={state.notesByTrack}
          trackId={state.focusedTrackId}
        />
        <div style={{ display: 'flex', paddingBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={() => dispatch(['Reset'])}>
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
    </Context.Provider>
  )
}

export default SnowflakeApp
