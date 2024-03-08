import React from 'react'

import Challenge from './Challenge'

export default ({challenges, challengeGroupIndex, updateChallengeGroupList}) => {
  return (
    <div className='challenges'>
      {challenges.map(({ completed, pageNumber, name, points }, challengeIndex) => (
        <Challenge
          key={challengeIndex}
          challengeGroupIndex={challengeGroupIndex}
          challengeIndex={challengeIndex}
          completed={completed}
          pageNumber={pageNumber}
          name={name}
          points={points}
          updateChallengeGroupList={updateChallengeGroupList}
        />
      ))}
    </div>
  )
}
