import React, { useContext } from 'react'
import { eligibleTitles } from '../constants'
import type { MilestoneMap } from '../constants'
import { Context } from '../state'

interface Props {
  milestoneByTrack: MilestoneMap
  currentTitle: string
}

const TitleSelector: React.FunctionComponent<Props> = ({
  milestoneByTrack,
  currentTitle,
}) => {
  const dispatch = useContext(Context)

  const titles = eligibleTitles(milestoneByTrack)
  return (
    <select
      value={currentTitle}
      onChange={e => dispatch(['SetTitle', e.target.value])}
    >
      <style jsx>{`
        select {
          font-size: 20px;
          line-height: 20px;
          margin-bottom: 20px;
          min-width: 300px;
        }
      `}</style>
      {titles.map(title => (
        <option key={title}>{title}</option>
      ))}
    </select>
  )
}

export default TitleSelector
