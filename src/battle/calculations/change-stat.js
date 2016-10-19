export function getStatChanges(action, casterModel, targetModel, currentChanges) {

    let changes = {};

    //Increase/Decrease a Stat with an Item
    if (typeof action.affectCasterAttackModifier === "number" && action.affectCasterAttackModifier !== 0) {
        changes["affectCasterAttackModifier"] = action.affectCasterAttackModifier
    }
    if (typeof action.affectCasterDefenseModifier === "number" && action.affectCasterDefenseModifier !== 0) {
        changes["affectCasterDefenseModifier"] = action.affectCasterDefenseModifier
    }
    if (typeof action.affectCasterSpeedModifier === "number" && action.affectCasterSpeedModifier !== 0) {
        changes["affectCasterSpeedModifier"] = action.affectCasterSpeedModifier
    }


    return {
        ...currentChanges,
        ...changes
    }
}