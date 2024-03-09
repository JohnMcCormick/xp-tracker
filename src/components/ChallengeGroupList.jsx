import React from 'react'

import ChallengeGroupTitle from './ChallengeGroupTitle'
import ChallengeGroupHeader from './ChallengeGroupHeader'
import ChallengeList from './ChallengeList'

export default ({ challengeGroupList, updateChallengeGroupList }) => {
  return challengeGroupList?.map(({ title, challenges }, challengeGroupIndex) => {
    return challenges && (
      <div key={challengeGroupIndex}>
        <ChallengeGroupTitle
          title={title}
        />
        <ChallengeGroupHeader />
        <ChallengeList
          challengeGroupIndex={challengeGroupIndex}
          updateChallengeGroupList={updateChallengeGroupList}
          challenges={challenges}
        />
      </div>
    )
  })
}
