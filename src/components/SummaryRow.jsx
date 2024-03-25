import { CELL_XP } from "../constants";

export default ({ remainingXP }) => {
    return new Array(8).fill().map((_, i) => {
        let filled = remainingXP >= CELL_XP;
        if (filled) remainingXP -= CELL_XP;

        return (
            <div key={i} className={`xp-table-cell${filled ? ' filled' : ''}`}>
                <span>{CELL_XP}</span>
            </div>
        )
    })
}