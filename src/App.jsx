import { useEffect, useState } from 'react'
import challengeData from './challengeData'
import './App.css'

import Challenge from './Challenge';
import ResetButton from './ResetButton';

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
      <div>
        <div className='summary'>
          <div>Total XP: {getTotalXP()}</div>
          <div>Current Level: {getCurrentLevel()}</div>
        </div>
      </div>
      <div>
        {challengeList?.map(({ title, challenges }, challengeGroupIndex) => {
          return challenges && (
            <div key={challengeGroupIndex}>
              <div className='challenge-group-title'>{title}</div>
              <div className='challenge-group-header'>
                <span></span>
                <span>Page</span>
                <span>Name</span>
                <span>XP</span>
              </div>
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
                    updateChallengeList={updateChallengeList}
                  />
                ))
                }
              </div>
            </div>
          )
        })}
        <div className='reset-button-wrapper'>
          <ResetButton
            resetChallengeList={resetChallengeList}
          />
        </div>
      </div>
    </div>
  )
}

export default App
