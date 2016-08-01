import Actions from '../../_data/battle-actions'
import {randomFromArray} from '../../helpers/random-from-array'

/* STATUS */
export function doesCombatantHaveAnyStatus(combatantModel) {
    return combatantModel.status != "normal";
}
export function doesCombatantHaveNegativeStatus(combatantModel) {
    const status = combatantModel.status;
    return (status == "lag" || status == "memory-leak" || status == "fire");
}
export function doesCombatantHavePositiveStatus(combatantModel) {
    const status = combatantModel.status;
    return (status == "zen" || status == "fury" || status == "deadline");
}

export function findMoveThatCanHealStatus(list=[], status="") {
    const available = list.filter(id => {
        const model = Actions[id];
        if (Array.isArray(model.affectCasterStatus)) {
            return (model.affectCasterStatus[0] == status && model.affectCasterStatus[1] == "normal");
        }
        return model.affectCasterStatus == "normal";
    });

    if (available.length) {
        return randomFromArray(available)
    }
    return null;
}


export function findMoveThatCanGiveMeStatus(list=[], status="") {
    const available = list.filter(id => {
        const model = Actions[id];
        if (Array.isArray(model.affectCasterStatus)) {
            return (model.affectCasterStatus[1] == status);
        }
        return model.affectCasterStatus == status;
    });

    if (available.length) {
        return randomFromArray(available)
    }
    return null;
}
export function findMoveThatCanGiveEnemyStatus(list=[], status="") {
    const available = list.filter(id => {
        const model = Actions[id];
        if (Array.isArray(model.affectTargetStatus)) {
            return (model.affectTargetStatus[1] == status);
        }
        return model.affectTargetStatus == status;
    });

    if (available.length) {
        return randomFromArray(available)
    }
    return null;
}



export function findAttackThatGivesMePositiveStatus(combatantModel) {
    const positiveStatuses = ["zen", "fury", "deadline"];
    var available = [];
    positiveStatuses.forEach( status => {
        const result = findMoveThatCanGiveMeStatus(combatantModel.attacks, status);
        if (result) {
            available.push(result);
        }
    });

    if (available.length) {
        return randomFromArray(available)
    }
    return null;
}


export function findAttackThatGivesEnemyNegativeStatus(combatantModel) {
    const negativeStatuses = ["lag", "memory-leak", "fire"];
    var available = [];
    negativeStatuses.forEach( status => {
        const result = findMoveThatCanGiveEnemyStatus(combatantModel.attacks, status);
        if (result) {
            available.push(result);
        }
    });

    if (available.length) {
        return randomFromArray(available)
    }
    return null;
}



export function findAttackThatCanHealStatus(combatantModel) {
    return findMoveThatCanHealStatus(combatantModel.attacks, combatantModel.status);
}
export function findItemThatCanHealStatus(combatantModel) {
    return findMoveThatCanHealStatus(combatantModel.items, combatantModel.status);
}


/* HP */
export function isCombatantHpFull(combatantModel) {
    return combatantModel.hp >= combatantModel.maxHp
}
export function isCombatantHpCritical(combatantModel) {
    //Is HP less than or equal to 20%?
    return combatantModel.hp <= Math.round( combatantModel.maxHp * 0.2 )
}


export function findMoveThatCanRecoverHp(list=[]) {
    const available = list.filter(id => {
        const model = Actions[id];
        return model.affectCasterHpPoints > 0;
    });

    if (available.length) {
        return randomFromArray(available)
    }
    return null;
}
export function findAttackThatCanRecoverHp(combatantModel) {
    return findMoveThatCanRecoverHp(combatantModel.attacks);
}
export function findItemThatCanRecoverHp(combatantModel) {
    return findMoveThatCanRecoverHp(combatantModel.items);
}

/* ITEMS */
export function doesCombatantHaveItems(combatantModel) {
    return combatantModel.items.length > 0
}

export function findMoveThatCanStealItems(list=[]) {
    const available = list.filter(id => {
        const model = Actions[id];
        return model.theftQuantity > 0;
    });

    if (available.length) {
        return randomFromArray(available)
    }
    return null;
}
export function findAttackThatCanStealItems(combatantModel) {
    return findMoveThatCanStealItems(combatantModel.attacks);
}

/* DAMAGE METER */
export function isDangerMeterUsable(combatantModel) {
    return combatantModel.isDangerMeterUsable();
}


/* PP MANAGEMENT */
export function findLeastExpensivePpMove(combatantModel) {
    const sorted = [...combatantModel.attacks].sort((idA, idB) => {
        const modelA = Actions[idA];
        const modelB = Actions[idB];
        return modelA.ppCost > modelB.ppCost ? 1 : -1;
    });
    return sorted[0];
}

/* DAMAGE */
export function findMostDamagingAttack(combatantModel) {
    const sorted = [...combatantModel.attacks].sort((idA, idB) => {
        const modelA = Actions[idA];
        const modelB = Actions[idB];
        return modelA.affectTargetHpPoints > modelB.affectTargetHpPoints ? 1 : -1;
    });
    /* This will return the most damaging `affectTargetHpPoints` value. However,
        it does not account for potential repetitions or a deferred payload. May want
         to add further considerations for those attacks. At this point, why would an enemy
         ever choose "Promise" or "ForEach" over "Slice Mk II" ?
     */
    return sorted[0];
}

/* RANDOM ATTACK */
export function findRandomAttack(combatantModel) {
    const available = combatantModel.attacks.filter(id => {
        const model = Actions[id];
        return model.type == "Normal";
    });

    if (available.length == 0) {
        return "attack-000-a"; //Couldn't find any to use, so use Insult
    }

    return randomFromArray(available);
}