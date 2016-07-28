/**
 * Return combatantId who won! This usually called after getDeadCombatantId
 */
export function getWinningCombatantId(newState) {
    var alive = Object.keys(newState.combatants).map(cId => {
        const model = newState.combatants[cId];
        return model.hp > 0 ? cId : null
    }).filter(d => {
        return Boolean(d)
    });
    return (alive.length == 1) ? alive[0] : null;

}