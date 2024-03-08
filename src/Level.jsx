import React from 'react'

function Level({ completed, pageNumber, name, points, setLevelComplete }) {
  return (
    <div
      className={`level ${completed ? 'strikethrough' : ''}`}
      onClick={() => setLevelComplete(i)}
    >
      {pageNumber} {name} {points}
    </div>
  )
}

export default Level