import React from 'react'

const getCurrentLevel = (totalXP) => {
  let remainingXP = totalXP;
  let nextLevel = 200;
  let currentLevel = 1;

  while (remainingXP >= nextLevel) {
    remainingXP -= nextLevel;
    nextLevel += 200;
    currentLevel += 1;
  }
  return currentLevel;
}

const SummaryTable = ({ totalXP }) => {
  let remainingXP = totalXP;
  return new Array(9).fill().map((_, levelIndex) => {
    let level = levelIndex + 1;
    let levelXP = level * 8 * 25;
    let XPForLevel = remainingXP;
    if (remainingXP >= levelXP) {
      remainingXP -= levelXP;
    } else {
      remainingXP = 0;
    }
    return <div key={levelIndex} className='xp-table-level'><SummaryLevel remainingXP={XPForLevel} rows={level} /></div>
  })
}

const SummaryLevel = ({ rows, remainingXP }) => {
  return new Array(rows).fill().map((_, i) => {
    let rowXP = 8 * 25;
    let XPForLevel = remainingXP;
    if (remainingXP >= rowXP) {
      remainingXP -= rowXP
    } else {
      remainingXP = 0
    }
    return <div key={i} className='xp-table-row'><SummaryCells remainingXP={XPForLevel} /></div>
  })
}


const SummaryCells = ({ remainingXP }) => {
  return new Array(8).fill().map((_, i) => {
    let filled = remainingXP >= 25;
    if (filled) remainingXP -= 25;
    return <div key={i} className={`xp-table-cell ${filled ? 'filled' : ''}`}>25</div>
  })
}

export default ({ totalXP }) => {
  const currentLevel = getCurrentLevel(totalXP)
  return (
    <div className="summary-wrapper">
      <div className='summary'>
        <div>Total XP: {totalXP}</div>
        <div>Current Level: {currentLevel}</div>
      </div>
      <div className='xp-table'>
        <span>Additional XP: 0</span>
        <div className='xp-table-container'>
          <SummaryTable totalXP={totalXP} />
        </div>
      </div>
    </div>
  )
}