import {getRandomInRange} from '../../helpers/numbers-helper'
import {randomFromArray} from '../../helpers/random-from-array'
import range from 'lodash/range'
import {applyFrameworkBonus} from './framework-dynamics'

export function getRegularAttackChanges(action, casterModel, targetModel, currentChanges) {

    let changes = {};

    if (action.affectTargetHpPoints != 0 || action.affectTargetHpPointsByPercent != 0) {

        if (action.repetitions.length) {
            //Do the roll [x,x] amount of times
            const repetitionsCount = getRandomInRange( action.repetitions[0], action.repetitions[1]);

            const damageRange = Array.isArray(action.affectTargetHpPoints)
                ? action.affectTargetHpPoints
                : [2,3,4,5,6];

            const chosenBase = randomFromArray(damageRange);



            let totalDamageCounter = 0;
            range(0, repetitionsCount).forEach((number, index) => {
                /* Add a random number from the range */
                if (action.repetitionType == "random") {
                    totalDamageCounter += randomFromArray(damageRange);
                }

                /* Add a consistent number from the range (chosenBase) */
                if (action.repetitionType == "map") {
                    totalDamageCounter += chosenBase;
                }

                /* Add a consistent number from the range (chosenBase) */
                if (action.repetitionType == "reduce") {
                    totalDamageCounter += (chosenBase + index);
                }
            });

            //console.log(totalDamageCounter);
            changes["repetitionsCount"] = repetitionsCount;
            changes["affectTargetHp"] = -totalDamageCounter;

        } else {

            // Point based strike
            if (action.affectTargetHpPoints != 0) {

                let attackRoll = casterModel.attackRoll(
                    action.affectTargetHpPoints,
                    targetModel.defenseRating,
                    targetModel.status,
                    action,
                    targetModel
                );

                /* Status multiplier. EX: Scope Bomb is more effective against Deadline */
                if (action.statusMultiplier && targetModel.status == action.statusMultiplier[0]) {
                    attackRoll = Math.round( attackRoll * action.statusMultiplier[1]);
                    changes["wasSuperEffective"] = true
                }

                /* Bypass attack stat. EX: "Insult" */
                if (action.bypassCasterAttackStats) {
                    attackRoll = action.affectTargetHpPoints;
                }



                changes["affectTargetHp"] = attackRoll;
            }
            // Percentage based strike
            if (action.affectTargetHpPointsByPercent != 0) {
                changes["affectTargetHp"] = Math.round(action.affectTargetHpPointsByPercent * targetModel.maxHp);
            }
        }
    }

    if (action.affectCasterHpPointsByPercent != 0) { /* EX: Honeypot */
        changes["affectCasterHp"] = Math.round(action.affectCasterHpPointsByPercent * casterModel.maxHp);
    }


    /* Super Charge augmentation */
    if (changes["affectTargetHp"] < 0 && currentChanges.isSuperCharged) {

        changes["affectTargetHp"] = applyFrameworkBonus(
            changes["affectTargetHp"],
            action.superChargedFrameworkId,
            casterModel,
            targetModel
        );

    }



    /* HP RECOVERY */
    if (action.affectCasterHpPoints > 0) {
        const maxHp = casterModel.maxHp;
        const hp = casterModel.hp;
        const gain = ( hp + action.affectCasterHpPoints > maxHp )
            ? (maxHp - hp)
            : action.affectCasterHpPoints;

        changes["affectCasterHp"] = gain
    }

    return {
        ...currentChanges,
        ...changes
    }
}