import {findMostDamagingAttack, isDangerMeterUsable} from '../enemy-ai-paths';

export function viciousAiPath(casterModel, targetModel) {
    const attackId = findMostDamagingAttack(casterModel);

    const baseInstruction = {
        casterId: casterModel.id,
        targetId: targetModel.id,
        actionId: attackId
    };

    if (isDangerMeterUsable(casterModel)) {
        return {
            ...baseInstruction,
            //dangerCharge: "Palm or whatever" //TODO!
        }
    }
    return {
        ...baseInstruction,
        dangerCharge: null
    }
}


/*
 VICIOUS
    -> What is the most damaging attack I have?
    -> Is my Danger Meter ready to use?
        YES
            -> Use the attack with DANGER CHARGE
        NO
            -> Use the attack
 */