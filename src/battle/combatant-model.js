import Actions from '../_data/battle-actions'

export function CombatantModel(combatantState={}) {
    return {

        ...combatantState,

        accuracyRoll: (90 + combatantState.accuracyModifier), /* should be 0 to 100 after modifiers */
        attackRating: (combatantState.attackStatPoints + combatantState.attackModifier),
        defenseRating: (combatantState.defenseStatPoints + combatantState.defenseModifier),
        isDead: (combatantState.hp <= 0),
        isAlive: (combatantState.hp > 0),

        speedRoll: function(externalSpeedModification=0) {

            const base = combatantState.speedStatPoints + combatantState.speedModifier + externalSpeedModification;
            /* Deadline status: add 25% to speed stat */
            const deadlineBonus = (combatantState.status == "deadline") ? Math.round(combatantState.speedStatPoints * 0.25) : 0;
            return base + deadlineBonus;
        },

        attacks: getAvailableAttacks(combatantState)
    }
}

var getAvailableAttacks = function(combatantState={}) {
    const available = combatantState.attacks.filter(attackId => {
        const model = Actions[attackId];
        return combatantState.pp >= model.ppCost;
    });

    return available.length ? available : ["attack-000-a"]; /* Return just Insult if not enough PP for anything else */
};