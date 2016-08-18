import Actions from '../_data/battle-actions'
import {hasUpgrade} from './get-combatant-stats'
import {getAlignmentByUpgrades} from './get-alignment-by-upgrades'


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


        getAllAttacks() {
            //Regardless of available PP, get a list of all attacks I know
            return [...combatantState.attacks]
        },



        /* Rolls */
        speedRoll(externalSpeedModification=0) {
            const base = combatantState.speedStatPoints + combatantState.speedModifier + externalSpeedModification;
            /* Deadline status: add 25% to speed stat */
            const deadlineBonus = (combatantState.status == "deadline") ? Math.round(combatantState.speedStatPoints * 0.25) : 0;
            return base + deadlineBonus;
        },

        attackRoll(actionDamageCount, targetDefenseRating, targetStatus, actionModel, targetModel) {
            //targetStatus, actionModel are in here for you to use later for specific variations
            const attackDamage = (this.attackRating * -1) + actionDamageCount;
            const defenseOffset = Math.round(targetDefenseRating / 2);

            let result = attackDamage + defenseOffset; //attack Damage is a negative number

            /* Reduce result be decreased by Char upgrades */
            /* 1. Oathbreaker upgrade */
            if (actionModel.actionId == "attack-008-a-resolve") {
                result = applyOathbreakerUpgrades(result, targetModel.characterUpgrades);
            }



            return (result < -1) ? result : -1; //Should be a negative number
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
        },

        /* Alignment */
        ...getAlignmentByUpgrades(combatantState.laptopUpgrades),
        getAvailableFrameworkOptions() {
            return [
                {prop: this.f1Alignment, frameworkId: "framework_001"},
                {prop: this.f2Alignment, frameworkId: "framework_002"},
                {prop: this.f3Alignment, frameworkId: "framework_003"},
                {prop: this.f4Alignment, frameworkId: "framework_004"}
            ].filter(obj => {
                return obj.prop > 0
            }).map(obj => {
                return obj.frameworkId
            });
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


/**
 * Target Model reduces pain of a returning Promise
 */

var applyOathbreakerUpgrades = function(initialValue, targetUpgrades=[]) {
    if (hasUpgrade("character-upgrade-007-iii", targetUpgrades)) {
        //Reduce 50% - Oathbreaker III
        return Math.round( initialValue * 0.5 );
    }
    if (hasUpgrade("character-upgrade-007-ii", targetUpgrades)) {
        //Reduce 30% - Oathbreaker II
        return initialValue - Math.round( initialValue * 0.3 );
    }
    if (hasUpgrade("character-upgrade-007-i", targetUpgrades)) {
        //Reduce 15% - Oathbreaker I
        return initialValue - Math.round( initialValue * 0.15 );
    }

    return initialValue;
};