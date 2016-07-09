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

            const damageRange = [2,3,4,5,6];
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
                /* TODO: This function still needs to be balanced according to actual character Stats. Right now, everything is 0 */
                changes["affectTargetHp"] = casterModel.attackRoll(
                    action.affectTargetHpPoints,
                    targetModel.defenseRating,
                    targetModel.status,
                    action
                );
            }
            // Percentage based strike
            if (action.affectTargetHpPointsByPercent != 0) {
                changes["affectTargetHp"] = Math.round(action.affectTargetHpPointsByPercent * targetModel.maxHp);
            }
        }
    }


    /* Super Charge augmentation */
    if (changes["affectTargetHp"] < 0 && currentChanges.isSuperCharged) {
        const result = applyFrameworkBonus(
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