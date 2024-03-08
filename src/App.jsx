import { useEffect, useState } from 'react'
import challengeData from './challengeData'
import './App.css'

import ChallengeGroupTitle from './ChallengeGroupTitle';
import ChallengeGroupHeader from './ChallengeGroupHeader';
import ResetButton from './ResetButton';
import Summary from './Summary';
import Challenges from './Challenges';

function App() {
  const [challengeList, setChallengeList] = useState([])

  useEffect(() => {
    const localStorageChallengeList = localStorage.getItem("challenges")

    if (localStorageChallengeList === null) {
      resetChallengeList();
    } else {
      setChallengeList(JSON.parse(localStorageChallengeList));
    }
  }, [])

  const resetChallengeList = () => {
    setChallengeList(challengeData);
  }

  useEffect(() => {
    if (challengeList?.length > 0) {
      localStorage.setItem("challenges", JSON.stringify(challengeList));
    }
  }, [challengeList])

  const getTotalXP = () => {
    let total = 0;
    if (challengeList?.length > 0) {
      challengeList?.forEach(({ challenges }) => challenges?.forEach(({ completed, points }) => {
        if (completed === true) total += points;
      }));
    }
    return total;
  }

  const getCurrentLevel = () => {
    let remainingXP = getTotalXP();
    let nextLevel = 200;
    let currentLevel = 1;

    while (remainingXP >= nextLevel) {
      remainingXP -= nextLevel;
      nextLevel += 200;
      currentLevel += 1;
    }
    return currentLevel;
  }

  const updateChallengeList = (_challengeGroupIndex, _challengeIndex) => {
    setChallengeList([...challengeList].map((challengeGroup, challengeGroupIndex) => {
      if (challengeGroupIndex === _challengeGroupIndex) {
        const { title, challenges } = challengeGroup;
        const updatedChallenges = updateChallengeByIndex(challenges, _challengeIndex)
        return {
          title,
          challenges: updatedChallenges
        }
      }
      return challengeGroup
    }));
  }

  const updateChallengeByIndex = (challenges, _challengeIndex) => {
    return [...challenges].map((challenge, challengeIndex) => {
      if (challengeIndex === _challengeIndex) {
        challenge.completed = !challenge.completed
      }
      return challenge;
    });
  }

  return (
    <div className="wrapper">
      <Summary
        getTotalXP={getTotalXP}
        getCurrentLevel={getCurrentLevel}
      />
      <div>
        {challengeList?.map(({ title, challenges }, challengeGroupIndex) => {
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
        })}
        <ResetButton
          resetChallengeList={resetChallengeList}
        />
      </div>
    </div>
  )
}

export default App
