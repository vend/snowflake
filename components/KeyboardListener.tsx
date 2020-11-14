import React, { useContext, useEffect } from 'react'
import { Context } from '../state'

const KeyboardListener: React.FunctionComponent = () => {
  const dispatch = useContext(Context)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  function handleKeyDown(e: KeyboardEvent) {
    if (
      document.activeElement &&
      (document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA')
    ) {
      // Don't do shortcuts while input has focus.
      return
    }
    switch (e.code) {
      case 'ArrowUp':
        dispatch(['ShiftFocusedTrackMilestone', 1])
        e.preventDefault()
        break
      case 'ArrowRight':
        dispatch(['ShiftFocusedTrack', 1])
        e.preventDefault()
        break
      case 'ArrowDown':
        dispatch(['ShiftFocusedTrackMilestone', -1])
        e.preventDefault()
        break
      case 'ArrowLeft':
        dispatch(['ShiftFocusedTrack', -1])
        e.preventDefault()
        break
    }
  }

  return null
}

export default KeyboardListener
