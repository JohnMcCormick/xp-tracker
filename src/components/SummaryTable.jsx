import SummaryLevel from './SummaryLevel'

import { ROW_XP } from '../constants';

export default ({ totalXP }) => {
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
        <div key={levelIndex}>
          <div className='xp-table-level'><SummaryLevel remainingXP={XPForLevel} level={level} /></div>
          <div className='xp-table-level-header'>Current level: {level}</div>
        </div>
      ) : null;
    })
  }