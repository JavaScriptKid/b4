import {
    doesCombatantHaveAnyStatus,
    findAttackThatGivesEnemyNegativeStatus
} from '../enemy-ai-paths';

export function cursingAiPath(casterModel, targetModel) {

    /* Does the enemy have a status? */
    const enemyHasStatus = doesCombatantHaveAnyStatus(targetModel);
    if (enemyHasStatus) {
        return null;
    }

    /* Do I have a status inflicting move? */
    const negativeStatusAttackId = findAttackThatGivesEnemyNegativeStatus(casterModel);
    if (!negativeStatusAttackId) {
        return null; //Nope
    }

    return { //Yep!
        casterId: casterModel.id,
        targetId: targetModel.id,
        superChargedFrameworkId: null,
        actionId: negativeStatusAttackId
    }
}

/*
 CURSING
 Q. Does the enemy have a status? [DONE]
    YES
        -> INVALID PATH
    NO
        -> Do I have a status inflicting move? [DONE]

            YES
                -> (Randomize all potential options and pick one) -> Do it
            NO
                -> INVALID PATH
 */