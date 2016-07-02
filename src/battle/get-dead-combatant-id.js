/**
 * Return combatantId who has died
 */
export function getDeadCombatantId(newState) {
    var death = Object.keys(newState.combatants).map(cId => {
        const model = newState.combatants[cId];
        return model.hp <= 0 ? cId : null
    }).find(d => {
        return Boolean(d)
    });
    return death ? death : null;

}