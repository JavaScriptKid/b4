import Actions from '../_data/battle-actions'
import {hasUpgrade} from './get-combatant-stats'
import {getAlignmentByUpgrades} from './get-alignment-by-upgrades'
import {percentChance} from '../helpers/numbers-helper'

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


        getMiss( actionAccuracyModifier = 0) {
            /* Return true or false for if the attack should miss */
            let percentChanceOfMissing = 2; //2% for starting

            /* If "zen" status, make MORE accurate */
            /** status:"zen" */
            if (combatantState.status === "zen") {
                percentChanceOfMissing -= 20;
            }

            /* If "fury" status, make LESS accurate */
            /** status:"fury" */
            if (combatantState.status === "fury") {
                percentChanceOfMissing += 10;
            }

            percentChanceOfMissing -= actionAccuracyModifier; //Subtract action's resistance to missing
            return percentChance(percentChanceOfMissing);
        },


        getAllAttacks() {
            //Regardless of available PP, get a list of all attacks I know
            return [...combatantState.attacks]
        },

        isOutOfUsablePp() {
            //Is the combatant down to just "Insult" ?
            const available = combatantState.attacks.filter(attackId => {
                const model = Actions[attackId];
                return combatantState.pp >= model.ppCost;
            });

            //Don't include "Commit"
            if (available.length == 1 && available[0] == "attack-special-011-a") {
                return true;
            }


            return available.length == 0;
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
            let attackDamage = (this.attackRating * -1) + actionDamageCount;
            let defenseOffset = Math.round(targetDefenseRating / 2);

            /* If Target has "zen" status, INCREASE the defenseOffset */
            /** status:"zen" */
            if (targetStatus === "zen") {
                defenseOffset = Math.round(defenseOffset *= 1.33); //33% defenseOffset back in
            }

            /* If Caster has "fury" status, DECREASE `attackDamage` effect value (which does MORE damage) */
            /** status:"fury" */
            if (combatantState.status === "fury") {
                attackDamage = Math.round( attackDamage *= 1.33 ); //EX: -100 would be -133
            }

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


            /* Automatic NO if no alignment points are equipped. */
            const upgrades = getAlignmentByUpgrades(combatantState.laptopUpgrades);
            if (upgrades.f1Alignment + upgrades.f2Alignment + upgrades.f3Alignment + upgrades.f4Alignment === 0) {
                return false;
            }


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