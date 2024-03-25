import React from 'react'
import SummaryTable from './SummaryTable'

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

export default ({ totalXP, minimized, setMinimized }) => {
  return (
    <div className="summary-wrapper">
      <div className='summary'>
        <div className='summary-header'>
          <div></div>
          <div>
            <div className='summary-total-xp'><span>Total XP: {totalXP}</span></div>
            {minimized ? <div className='summary-current-level'><span>Current level: {getCurrentLevel(totalXP)}</span></div>: null}
          </div>
          <div className='minimize-button-wrapper'>
            <button className='minimize-button' onClick={() => setMinimized(!minimized)}>
              {minimized ?
                <i className="arrow up-arrow"></i>
                : <i className="arrow down-arrow"></i>
              }
            </button>
          </div>
        </div>
        {minimized ? null :
          <div className='xp-table'>
            <SummaryTable totalXP={totalXP} />
          </div>
        }

      </div>
    </div>
  )
}