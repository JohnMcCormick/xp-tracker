import SummaryLevel from './SummaryLevel'

import { ROW_XP } from '../constants';

export default ({ totalXP }) => {
    let remainingXP = totalXP;
    let hasDisplayedLevel = false;

    /* This function loops through each level, subtracting the amount of xp the user
    *  has by the amount the level requires until it reaches zero. 
    * 
    *  When that amount reaches zero, the current level to display has been determined, 
    *  displayLevel is changed to true, and XPForLevel is sent to the SummaryLevel component 
    *  which performs similar logic for the level. hasDisplayedLevel changes to true, which 
    *  means subsequent levels will never display.
    *  
    *  A previous version of this function filled each level, 1 through to the user's level, 
    *  with X's, making a tall table that emulated the print-out from the C# Player's Guide 
    *  Book that is app has been built to emulate: 
    *  (https://csharpplayersguide.com/assets/content/downloadables/5th-edition/XPTracker.pdf)
    * 
    *  To save screen space, now only the current level is displayed. I have kept the array method, 
    *  although inefficient, because a) I am too lazy to rewrite it, b) because it still makes sense 
    *  to me to frame the logic within 9 iteration levels, and c) because I might want to display the 
    *  entire page at some point, via a pop-out modal or some other method, and most of the logic to do
    *  that is still here. 
    */ 

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