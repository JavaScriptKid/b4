import Actions from '../../_data/battle-actions'
import {randomFromArray} from '../../helpers/random-from-array'

export function doesCombatantHaveNegativeStatus(combatantModel) {
    const status = combatantModel.status;
    return (status == "lag" || status == "memory-leak" || status == "fire");
}
export function doesCombatantHavePositiveStatus(combatantModel) {
    const status = combatantModel.status;
    return (status == "zen" || status == "fury" || status == "deadline");
}

export function findMoveThatCanHealStatus(combatantModel) {
    const status = combatantModel.status;

    const available = combatantModel.attacks.filter(id => {
        const model = Actions[id];
        if (Array.isArray(model.affectCasterStatus)) {
            return model.affectCasterStatus[1] == "normal";
        }
        return model.affectCasterStatus == "normal";
    });

    if (available.length) {
        return randomFromArray(available)
    }
    return null;
}