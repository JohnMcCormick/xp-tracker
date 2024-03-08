import React from 'react'

export default ({ getTotalXP, getCurrentLevel }) => {
  return (
    <div className='summary'>
      <div>Total XP: {getTotalXP()}</div>
      <div>Current Level: {getCurrentLevel()}</div>
    </div>
  )
}