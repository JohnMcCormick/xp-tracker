import { useEffect, useState } from 'react'
import levelList from './levelList'
import './App.css'

import Level from './Level';
import ResetButton from './ResetButton';

function App() {
  const [levels, setLevels] = useState([])

  useEffect(() => {
    const storedLevels = localStorage.getItem("levels")

    if (storedLevels === null) {
      setLevels(levelList.map(level => ({
        ...level,
        completed: false
      })));
    } else {
      setLevels(JSON.parse(storedLevels));
    }
  }, [])

  useEffect(() => {
    if (levels.length > 0) {
      localStorage.setItem("levels", JSON.stringify(levels));
    }
  }, [levels])

  const getTotalXP = () => {
    let total = 0;
    levels.forEach(({ completed, points }) => {
      if (completed === true) total += points;
    })
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

  const setLevelComplete = (index) => {
    setLevels(levels.map((level, i) => {
      if (i === index) {
        level.completed = !level.completed
      }
      return level;
    }))
  }

  return (
    <div className="wrapper">
      <div>
        <div className='summary'>
          <div>Total XP: {getTotalXP()}</div>
          <div>Current Level: {getCurrentLevel()}</div>
        </div>
      </div>
      <div className='levels'>
        <div className='level-title'>
          <span></span>
          <span>Page</span>
          <span>Name</span>
          <span>XP</span>
        </div>
        {levels.map(({ completed, pageNumber, name, points }, index) => (
          <Level
            key={index}
            index={index}
            completed={completed}
            pageNumber={pageNumber}
            name={name}
            points={points}
            setLevelComplete={setLevelComplete}
          />
        ))}
      </div>
      <div>
        <ResetButton
          levelList={levelList}
          setLevels={setLevels}
        />
      </div>
    </div>
  )
}

export default App
