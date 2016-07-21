import Actions from '../../_data/battle-actions'
import {randomFromArray} from '../../helpers/random-from-array'


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
