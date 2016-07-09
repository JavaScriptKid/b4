import Actions from '../_data/battle-actions'
import {hasUpgrade} from './get-combatant-stats'

export function CombatantModel(combatantState={}) {
    return {

        ...combatantState,

        accuracyRoll: (90 + combatantState.accuracyModifier), /* should be 0 to 100 after modifiers */
        attackRating: (combatantState.attackStatPoints + combatantState.attackModifier),
        defenseRating: (combatantState.defenseStatPoints + combatantState.defenseModifier),
        isDead: (combatantState.hp <= 0),
        isAlive: (combatantState.hp > 0),

        /* Attacks */
        attacks: getAvailableAttacks(combatantState),

        /* Rolls */
        speedRoll(externalSpeedModification=0) {
            const base = combatantState.speedStatPoints + combatantState.speedModifier + externalSpeedModification;
            /* Deadline status: add 25% to speed stat */
            const deadlineBonus = (combatantState.status == "deadline") ? Math.round(combatantState.speedStatPoints * 0.25) : 0;
            return base + deadlineBonus;
        },

        attackRoll(actionDamageCount, targetDefenseRating, targetStatus, actionModel) {
            //targetStatus, actionModel are in here for you to use later for specific variations
            /* TODO: This function still needs to be balanced according to actual character Stats. Right now, everything is 0 */
            //console.log(actionDamageCount, targetDefenseRating);

            const attackDamage = (this.attackRating * -1) + actionDamageCount;
            const defenseOffset = Math.round(targetDefenseRating / 2);
            const result = attackDamage + defenseOffset; //attack Damage is a negative number

            return (result < -1) ? result : -1;
        },

        /* Danger */
        isDangerMeterUsable() {


            const firstDangerMeterUpgrade = hasUpgrade("character-upgrade-005-i", combatantState.characterUpgrades);
            const secondDangerMeterUpgrade = hasUpgrade("character-upgrade-005-ii", combatantState.characterUpgrades);

            /* Dangerous I: 65% */
            if (firstDangerMeterUpgrade && !secondDangerMeterUpgrade) {
                return combatantState.dangerMeter >= (combatantState.maxDangerMeter * 0.65);
            }

            /* Dangerous II: 55% */
            if (firstDangerMeterUpgrade && secondDangerMeterUpgrade) {
                return combatantState.dangerMeter >= (combatantState.maxDangerMeter * 0.55);
            }

            /* Default: 75% */
            return combatantState.dangerMeter >= (combatantState.maxDangerMeter * 0.75);
        }


    }
}

var getAvailableAttacks = function(combatantState={}) {
    const available = combatantState.attacks.filter(attackId => {
        const model = Actions[attackId];
        return combatantState.pp >= model.ppCost;
    });

    return available.length ? available : ["attack-000-a"]; /* Return just Insult if not enough PP for anything else */
};