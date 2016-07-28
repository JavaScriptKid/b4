import Combatants from '../../_data/reporting-combatants'

/* This file will probably go away or turn into the execute game function */

export function playRound(combatantIds=[]) {

    const modelA = Combatants[ combatantIds[0] ];
    const modelB = Combatants[ combatantIds[1] ];

    const modelARoll = getRandomInRange(0,60) + (modelA.modifier || 0);
    const modelBRoll = getRandomInRange(0,60) + (modelB.modifier || 0);

    if (modelARoll >= modelBRoll) {
        return combatantIds[0]
    } else {
        return combatantIds[1]
    }
}


function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

