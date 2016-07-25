import {
    findRandomAttack
} from '../enemy-ai-paths';

export function randomAiPath(casterModel, targetModel) {

    return {
        casterId: casterModel.id,
        targetId: targetModel.id,
        superChargedFrameworkId: null,
        actionId: findRandomAttack(casterModel)
    }
}

/* This is really just a random Normal attack */