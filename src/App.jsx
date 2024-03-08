import { useEffect, useState } from 'react'
import jsonLevels from './levels'
import './App.css'


function App() {
  const [levels, setLevels] = useState([])

  useEffect(() => {
    const storedLevels = (localStorage.getItem("levels"))

    if (storedLevels === null) {
      setLevels(jsonLevels.map(level => ({
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
      console.log(levels)
    }
  }, [levels])


  const setLevelComplete = (index) => {
    setLevels(levels.map((level, i) => {
      if (i === index) {
        level.completed = !level.completed
      }
      return level;
    }))
  }

  const getTotalXP = () => {
    let total = 0;
    levels.forEach(level => {
      if (level.completed === true) total += level.points;
    })
    return total;
  }

  return (
    <div className="wrapper">
      <div>
        Total XP: {getTotalXP()}
      </div>
      <div className='levels'>
        {levels.map(({ completed, pageNumber, name, points }, i) => (<>
          <div
            key={i}
            className={`level ${completed ? 'strikethrough' : ''}`}
            onClick={() => setLevelComplete(i)}
          >
            {pageNumber} {name} {points}
          </div>
        </>))}
      </div>
    </div>
  )
}

export default App
