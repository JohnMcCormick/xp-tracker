import React from 'react'
import SummaryTable from './SummaryTable'
import ResetButton from './ResetButton';

export default ({ totalXP, resetToDefaultState }) => {
  return (
    <div className="summary-wrapper">
      <div className='summary'>
        <div>Total XP: {totalXP}</div>
        <div className='xp-table'>
          <SummaryTable totalXP={totalXP} />
        </div>
        <ResetButton
        resetToDefaultState={resetToDefaultState}
      />
      </div>
    </div>
  )
}