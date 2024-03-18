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

const SummaryTable = () => {
  return new Array(9).fill().map((_, i) => <SummaryLevel rows={9 - i} />)
}

const SummaryLevel = ({ rows }) => {
  return (<div className='xp-table-level'>{new Array(rows).fill().map(() => <div className='xp-table-row'>{(new Array(8)).fill().map(() => <div className='xp-table-cell'>25</div>)}</div>)}</div>)
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
        <SummaryTable />
      </div>
    </div>
  )
}