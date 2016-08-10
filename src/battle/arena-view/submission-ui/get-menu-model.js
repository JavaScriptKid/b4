import Actions from '../../../_data/battle-actions'

export function getMenuModel(casterModel) {

    const attack = filterActionsByType(casterModel.attacks, "Normal", casterModel.pp);
    const special = filterActionsByType(casterModel.attacks, "Special", casterModel.pp);

    return {

        canUseSuper: casterModel.isDangerMeterUsable(),
        structure: {
            root: [],
            superCharge: [],
            attack: attack,
            special: special,
            items: [...casterModel.items]
        }
    }
}

/* Utility for getting Type of actions */
var filterActionsByType = function(actionList, type="", currentPp) {
    return actionList.filter(aId => {
        const model = Actions[aId];
        return model.type === type && currentPp >= model.ppCost;
    });
};