import React from 'react'

export default ({ index, completed, pageNumber, name, points, setLevelComplete }) => {
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