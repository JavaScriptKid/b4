import {
    doesCombatantHaveNegativeStatus,
    findAttackThatCanHealStatus,
    findItemThatCanHealStatus,
    isCombatantHpFull,
    findItemThatCanRecoverHp,
    findAttackThatGivesMePositiveStatus,
    doesCombatantHaveAnyStatus
} from '../enemy-ai-paths';

export function protectiveAiPath(casterModel, targetModel) {

    let result = null;

    /* Q. Do I have any NEGATIVE statuses? */
    if (doesCombatantHaveNegativeStatus(casterModel)) {
        result = findAttackThatCanHealStatus(casterModel);

        if (!result) {
            result = findItemThatCanHealStatus(casterModel)
        }
    }

    /* Q Is my HP less than full? */
    if (!result) {
        const hpIsFull = isCombatantHpFull(casterModel);
        if (!hpIsFull) {
            result = findItemThatCanRecoverHp(casterModel);
        }
    }

    /* Q Can I give myself a positive status? */
    if (!result) {
        if (!doesCombatantHaveAnyStatus(casterModel)) {
            result = findAttackThatGivesMePositiveStatus(casterModel);
        }
    }

    return result ? {
        casterId: casterModel.id,
        targetId: targetModel.id,
        superChargedFrameworkId: null,
        actionId: result
    } : null
}

/*
 PROTECTIVE
 Q Do I have any NEGATIVE statuses? [DONE]
 YES
 -> Can I heal it with an attack? [DONE]
 YES
 -> Do it
 NO
 Can I heal it with an item? [DONE]
 YES
 -> Do it
 NO
 -> (Next question)
 NO -> (Next question)

 Q Is my HP less than full? [DONE]
 YES
 -> Do I have any Items that can recover my HP?  [DONE]
 YES
 -> Do it
 NO
 -> (Next question)

 Q Do I have any moves that give me a positive status? [DONE]
 YES
 -> (Randomize all potential options and pick one) -> Do it
 NO
 -> INVALID PATH
 */