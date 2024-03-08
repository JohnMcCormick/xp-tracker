import { useEffect, useState } from 'react'
import defaultState from './data/defaultState'
import './App.css'

import Summary from './components/Summary';
import ChallengeGroupList from './components/ChallengeGroupList';
import ResetButton from './components/ResetButton';

function App() {
  const [challengeGroupList, setChallengeGroupList] = useState([])

  useEffect(() => {
    const localStorageState = localStorage.getItem("challenges")

    if (localStorageState === null) {
      resetToDefaultState();
    } else {
      setChallengeGroupList(JSON.parse(localStorageState));
    }
  }, [])

  const resetToDefaultState = () => {
    setChallengeGroupList(defaultState);
  }

  useEffect(() => {
    if (challengeGroupList?.length > 0) {
      localStorage.setItem("challenges", JSON.stringify(challengeGroupList));
    }
  }, [challengeGroupList])

  const getTotalXP = () => {
    let total = 0;
    if (challengeGroupList?.length > 0) {
      challengeGroupList?.forEach(({ challenges }) => challenges?.forEach(({ completed, points }) => {
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

  const updateChallengeGroupList = (_challengeGroupIndex, _challengeIndex) => {
    setChallengeGroupList([...challengeGroupList].map((challengeGroup, challengeGroupIndex) => {
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
      <h1 className='main-title'>The C# Player's Guide XP Tracker</h1>
      <Summary
        getTotalXP={getTotalXP}
        getCurrentLevel={getCurrentLevel}
      />
      <ChallengeGroupList
        challengeList={challengeGroupList}
        updateChallengeGroupList={updateChallengeGroupList}
      />
      <ResetButton
        resetChallengeList={resetToDefaultState}
      />
    </div>
  )
}

export default App
