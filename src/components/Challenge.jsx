import React from 'react'

export default ({ challengeGroupIndex, challengeIndex, completed, pageNumber, name, points, updateChallengeList }) => {
  const formattedPageNumber = pageNumber > 0 ? pageNumber : '';
  return (
    <div
      className='challenge'
      onClick={() => updateChallengeList(challengeGroupIndex, challengeIndex)}
    >
      <input className='checkbox' type='checkbox' checked={completed} onChange={() => {}}></input>
      <span>{formattedPageNumber}</span>
      <span className={`challenge-name ${completed && 'strikethrough'}`}>{name}</span>
      <span>{points}</span>
    </div>
  )
}