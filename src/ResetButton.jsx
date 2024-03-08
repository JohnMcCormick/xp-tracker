import React from 'react'

export default ({ levelList, setLevels }) => {
  return (
    <button onClick={() => {
      setLevels(levelList.map(level => ({
        ...level,
        completed: false
      })));
    }}>
      Reset
    </button>
  )
}
