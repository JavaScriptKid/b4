export function getMiss(action, casterModel, targetModel, currentChanges) {

    let changes = {};

    /* This property should always exist. true or false */
    changes["didActionMiss"] = casterModel.getMiss( action.accuracyModifier );

    return {
        ...currentChanges,
        ...changes
    }
}