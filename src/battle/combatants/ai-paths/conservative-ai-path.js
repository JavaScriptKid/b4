import {
    isDangerMeterUsable,
    findLeastExpensivePpMove
} from '../enemy-ai-paths';

export function conservativeAiPath(casterModel, targetModel) {

    //let result = null;

    //Q. Is my danger meter ready to use?
    if (isDangerMeterUsable(casterModel)) {
        //TODO
        //Then use the smartest super charged option
    }

    //TODO
    //Q. Do I have any items that increase my Danger Meter?

    //Q. What is the lowest costing PP "Normal" move I have?
    let result = findLeastExpensivePpMove(casterModel);

    return result ? {
        casterId: casterModel.id,
        targetId: targetModel.id,
        superChargedFrameworkId: null,
        actionId: result
    } : null
}

/*
 CONSERVATIVE
 Q. Is my danger meter ready to use? [DONE]
        YES
            -> Do I have a Framework that my enemy is weak against?
                YES
                    -> Super Charge strongest move with Best choice
                NO
                    -> Next Q

        NO -> Next Q

 Q. Do I have any items that increase my Danger Meter?
        YES
            -> Use it
        NO
            -> Next Q.

 Q. What is the lowest costing PP "Normal" move I have? [DONE]
        - Use it


 */