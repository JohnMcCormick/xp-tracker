import React from 'react'

import ChallengeGroupTitle from './ChallengeGroupTitle'
import ChallengeGroupHeader from './ChallengeGroupHeader'
import Challenges from './Challenges'

export default ({ challengeList, updateChallengeList }) => {
  return challengeList?.map(({ title, challenges }, challengeGroupIndex) => {
    return challenges && (
      <div key={challengeGroupIndex}>
        <ChallengeGroupTitle
          title={title}
        />
        <ChallengeGroupHeader />
        <Challenges
          challengeGroupIndex={challengeGroupIndex}
          updateChallengeList={updateChallengeList}
          challenges={challenges}
        />
      </div>
    )
  })
}
