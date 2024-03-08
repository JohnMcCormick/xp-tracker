import { useEffect, useState } from 'react'
import levelList from './levelList'
import './App.css'

import Level from './Level';

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
        Total XP: {getTotalXP()}
      </div>
      <div className='levels'>
        {levels.map(({ completed, pageNumber, name, points }, index) => (
          <Level
            key={index}
            completed={completed}
            pageNumber={pageNumber}
            name={name}
            points={points}
            setLevelComplete={setLevelComplete}
          />
        ))}
      </div>
    </div>
  )
}

export default App
