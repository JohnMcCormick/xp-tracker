import React from 'react'

export default ({ challengeGroupIndex, challengeIndex, completed, pageNumber, name, points, setChallengeComplete }) => {
  const formattedPageNumber = pageNumber > 0 ? pageNumber : '';
  return (
    <div
      className='challenge'
      onClick={() => setChallengeComplete(challengeGroupIndex, challengeIndex)}
    >
      <input className='checkbox' type='checkbox' checked={completed} onChange={() => {}}></input>
      <span>{formattedPageNumber}</span>
      <span className={`${completed && 'strikethrough'}`}>{name}</span>
      <span>{points}</span>
    </div>
  )
}