import React from 'react'

export default ({ resetToDefaultState }) => {
  return (
    <div className='reset-button-wrapper'>
      <button
        type="button"
        onClick={resetToDefaultState}>
        Reset
      </button>
    </div>
  )
}
