import React from 'react'

function Level({ index, completed, pageNumber, name, points, setLevelComplete }) {
  const formattedPageNumber = pageNumber > 0 ? pageNumber : '';
  return (
    <div
      className={`level ${completed ? 'strikethrough' : ''}`}
      onClick={() => setLevelComplete(index)}
    >
      {formattedPageNumber} {name} {points}
    </div>
  )
}

export default Level