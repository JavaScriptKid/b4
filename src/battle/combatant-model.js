export function CombatantModel(combatantState={}) {
    return {
        ...combatantState,
        accuracyRoll: (90 + combatantState.accuracyModifier), /* should be 0 to 100 after modifiers */
        attackRating: (combatantState.attackStatPoints + combatant.attackModifier),
        defenseRating: (combatantState.defenseStatPoints + combatant.defenseModifier),
        isDead: (combatantState.hp <= 0),
        isAlive: (combatantState.hp > 0)
    }
}