import SummaryRow from './SummaryRow'
import { ROW_XP  } from '../constants';

export default ({ level, remainingXP }) => {
    /* The number of rows to create is the level number. i.e.
    *  1 row for level 1, 2 rows for level 2, etc.
    */ 

    return new Array(level).fill().map((_, i) => {
      let XPForRow = remainingXP;
      if (remainingXP >= ROW_XP) {
        remainingXP -= ROW_XP
      } else {
        remainingXP = 0
      }
      return <div key={i} className='xp-table-row'><SummaryRow remainingXP={XPForRow} /></div>
    })
  }