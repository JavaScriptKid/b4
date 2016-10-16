export function getStatChanges(action, casterModel, targetModel, currentChanges) {

    let changes = {};

    //Increase/Decrease a Stat with an Item
    if (action.affectCasterAttackModifier !== 0) {
        changes["affectCasterAttackModifier"] = action.affectCasterAttackModifier
    }
    if (action.affectCasterDefenseModifier !== 0) {
        changes["affectCasterDefenseModifier"] = action.affectCasterDefenseModifier
    }
    if (action.affectCasterSpeedModifier !== 0) {
        changes["affectCasterSpeedModifier"] = action.affectCasterSpeedModifier
    }


    return {
        ...currentChanges,
        ...changes
    }
}