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

export default ({ totalXP }) => {
  return (
    <div className='summary'>
      <div>Total XP: {totalXP}</div>
      <div>Current Level: {getCurrentLevel(totalXP)}</div>
    </div>
  )
}