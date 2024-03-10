import React from 'react'

import ChallengeGroupTitle from './ChallengeGroupTitle'
import ChallengeGroupHeader from './ChallengeGroupHeader'
import Challenges from './Challenges'

export default ({ challengeGroupList, updateChallengeGroupList }) => {
  return challengeGroupList?.map(({ title, challenges }, challengeGroupIndex) => {
    return challenges && (
      <div key={challengeGroupIndex}>
        <ChallengeGroupTitle
          title={title}
        />
        <ChallengeGroupHeader />
        <Challenges
          challengeGroupIndex={challengeGroupIndex}
          updateChallengeGroupList={updateChallengeGroupList}
          challenges={challenges}
        />
      </div>
    )
  })
}
