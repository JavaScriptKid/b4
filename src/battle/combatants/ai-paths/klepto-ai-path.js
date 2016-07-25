import {
    doesCombatantHaveItems,
    findAttackThatCanStealItems
} from '../enemy-ai-paths';

export function kleptoAiPath(casterModel, targetModel) {

    /* Fail is Enemy doesn't have any items */
    if (!doesCombatantHaveItems(targetModel)) {
        return null;
    }


    const stealingMove = findAttackThatCanStealItems(casterModel);

    /* Fail if I don't have a stealing move */
    if (!stealingMove) {
        return null;
    }

    return {
        casterId: casterModel.id,
        targetId: targetModel.id,
        superChargedFrameworkId: null,
        actionId: stealingMove
    }
}


/*
 KLEPTO
    Q. Does the enemy have items? [DONE]
        YES
            -> Do I have a Theft move? [DONE]
                YES
                    -> (Randomize all potential options and pick one) -> Do it
                NO
                    -> INVALID PATH
        NO
            -> INVALID PATH
 */