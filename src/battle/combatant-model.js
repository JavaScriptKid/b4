export function CombatantModel(combatantState={}) {

    return {

        ...combatantState,

        accuracyRoll: (90 + combatantState.accuracyModifier), /* should be 0 to 100 after modifiers */
        attackRating: (combatantState.attackStatPoints + combatantState.attackModifier),
        defenseRating: (combatantState.defenseStatPoints + combatantState.defenseModifier),
        isDead: (combatantState.hp <= 0),
        isAlive: (combatantState.hp > 0),

        speedRoll: function(externalSpeedModification=0) {
            return combatantState.speedStatPoints + combatantState.speedModifier + externalSpeedModification
        }
    }
}