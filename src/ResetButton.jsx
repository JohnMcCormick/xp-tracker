import React from 'react'

export default ({ resetChallengeList }) => {
  return (
    <div className='reset-button-wrapper'>
      <button
        type="button"
        onClick={resetChallengeList}>
        Reset
      </button>
    </div>
  )
}
