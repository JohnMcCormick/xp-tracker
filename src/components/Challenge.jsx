import React from 'react'

export default ({ challengeGroupIndex, challengeIndex, completed, pageNumber, name, points, updateChallengeGroupList }) => {
  return (
    <div
      className='challenge'
      onClick={() => updateChallengeGroupList(challengeGroupIndex, challengeIndex)}
    >
      <input className='checkbox' type='checkbox' checked={completed} onChange={() => {}}></input>
      <span>{pageNumber}</span>
      <span className={`challenge-name ${completed && 'strikethrough'}`}>{name}</span>
      <span className='challenge-xp'>{points}</span>
    </div>
  )
}