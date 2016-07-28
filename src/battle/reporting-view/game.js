import Combatants from '../../_data/_reporting-combatants'

/* This file will probably go away or turn into the execute game function */

export function playRound(combatantIds=[]) {

    const modelA = Combatants[ combatantIds[0] ];
    const modelB = Combatants[ combatantIds[1] ];

    const modelARoll = getRandomInRange(0,60) + modelA.modifier;
    const modelBRoll = getRandomInRange(0,60) + modelB.modifier;

    if (modelARoll >= modelBRoll) {
        return combatantIds[0]
    } else {
        return combatantIds[1]
    }
}


function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

