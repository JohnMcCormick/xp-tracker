import React from 'react'

export default ({ index, completed, pageNumber, name, points, setLevelComplete }) => {
  const formattedPageNumber = pageNumber > 0 ? pageNumber : '';
  return (
    <div
      className='level'
      onClick={() => setLevelComplete(index)}
    >
      <input className='checkbox' type='checkbox' checked={completed}></input>
      <span>{formattedPageNumber}</span>
      <span className={`${completed && 'strikethrough'}`}>{name}</span>
      <span>{points}</span>
    </div>
  )
}