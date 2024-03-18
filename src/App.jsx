import { useEffect, useState } from 'react'
import defaultState from './data/defaultState'
import './App.css'

import Summary from './components/Summary';
import ChallengeGroupList from './components/ChallengeGroupList';
import ResetButton from './components/ResetButton';

function App() {
  const [totalXP, setTotalXP] = useState(0);
  const [challengeGroupList, setChallengeGroupList] = useState(() => {
    const localStorageState = localStorage.getItem("challenges");

    if (localStorageState === null) {
      return getDefaultState();
    } else {
      return JSON.parse(localStorageState);
    }
  });

  useEffect(() => {
    if (challengeGroupList?.length > 0) {
      localStorage.setItem("challenges", JSON.stringify(challengeGroupList));
      updateTotalXP();
    }
  }, [challengeGroupList])

  const getDefaultState = () => {
    return JSON.parse(JSON.stringify(defaultState))
  }

  const updateTotalXP = () => {
    let total = 0;
    if (challengeGroupList?.length > 0) {
      challengeGroupList.forEach(({ challenges }) => challenges?.forEach(({ completed, points }) => {
        if (completed === true) total += points;
      }));
    }
    setTotalXP(total);
  }

  const updateChallengeGroupList = (challengeGroupIndexToChange, challengeIndexToChange) => {
    setChallengeGroupList([...challengeGroupList].map((challengeGroup, challengeGroupIndex) => {
      if (challengeGroupIndex === challengeGroupIndexToChange) {
        const { title, challenges } = challengeGroup;
        return {
          title,
          challenges: toggleChallengeByIndex(challenges, challengeIndexToChange)
        }
      }
      return challengeGroup;
    }));
  }

  const toggleChallengeByIndex = (challenges, challengeIndexToChange) => {
    return [...challenges].map((challenge, challengeIndex) => {
      if (challengeIndex === challengeIndexToChange) {
        challenge.completed = !challenge.completed;
      }
      return challenge;
    });
  }

  return (
    <div className="wrapper">
      <h1 className='main-title'>The C# Player's Guide XP Tracker</h1>
      <Summary
        totalXP={totalXP}
      />
      <ChallengeGroupList
        challengeGroupList={challengeGroupList}
        updateChallengeGroupList={updateChallengeGroupList}
      />
      <ResetButton
        resetToDefaultState={() => {
          setChallengeGroupList(getDefaultState())
        }}
      />
    </div>
  )
}

export default App
