import React from 'react'

interface Props {
  increaseFocusedMilestoneFn: () => void
  selectNextTrackFn: () => void
  decreaseFocusedMilestoneFn: () => void
  selectPrevTrackFn: () => void
}

class KeyboardListener extends React.Component<Props> {
  public componentDidMount() {
    window.addEventListener('keydown', e => this.handleKeyDown(e)) // TK unlisten
  }

  private handleKeyDown(e: KeyboardEvent) {
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
        this.props.increaseFocusedMilestoneFn()
        e.preventDefault()
        break
      case 'ArrowRight':
        this.props.selectNextTrackFn()
        e.preventDefault()
        break
      case 'ArrowDown':
        this.props.decreaseFocusedMilestoneFn()
        e.preventDefault()
        break
      case 'ArrowLeft':
        this.props.selectPrevTrackFn()
        e.preventDefault()
        break
    }
  }

  public render() {
    return null
  }
}

export default KeyboardListener
