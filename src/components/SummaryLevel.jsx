import SummaryCells from './SummaryCells'
import { ROW_XP  } from '../constants';

export default ({ level, remainingXP }) => {
    return new Array(level).fill().map((_, i) => {
      let XPForLevel = remainingXP;
      if (remainingXP >= ROW_XP) {
        remainingXP -= ROW_XP
      } else {
        remainingXP = 0
      }
      return <div key={i} className='xp-table-row'><SummaryCells remainingXP={XPForLevel} /></div>
    })
  }