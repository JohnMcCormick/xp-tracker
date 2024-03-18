import React from 'react'

const CELL_XP = 25;
const ROW_XP = 8 * CELL_XP;

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
  let hasDisplayedLevel = false;
  return new Array(9).fill().map((_, levelIndex) => {
    let displayLevel = false;
    let level = levelIndex + 1;
    let levelXP = level * ROW_XP;
    let XPForLevel = remainingXP;
    if (remainingXP >= 0 && hasDisplayedLevel == false) {
      if (remainingXP >= levelXP) {
        remainingXP -= levelXP;
      } else {
        remainingXP = 0;
        displayLevel = true;
        hasDisplayedLevel = true;
      }
    }
    return displayLevel ? (
      <div>
        <div key={levelIndex} className='xp-table-level'><SummaryLevel remainingXP={XPForLevel} rows={level} /></div>
        <div className='xp-table-level-header'>Level {level}</div>
      </div>
    ) : null;
  })
}

const SummaryLevel = ({ rows, remainingXP }) => {
  return new Array(rows).fill().map((_, i) => {
    let XPForLevel = remainingXP;
    if (remainingXP >= ROW_XP) {
      remainingXP -= ROW_XP
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
    return <div key={i} className={`xp-table-cell ${filled ? 'filled' : ''}`}><span>25</span></div>
  })
}

export default ({ totalXP }) => {
  const currentLevel = getCurrentLevel(totalXP)
  return (
    <div className="summary-wrapper">
      <div className='summary'>
        <div>Total XP: {totalXP}</div>
        <div className='summary-current-level'>Current Level: {currentLevel}</div>
        {/* <span>Additional XP: 0</span> */}
        <div className='xp-table'>
          <SummaryTable totalXP={totalXP} />
        </div>
      </div>
    </div>
  )
}