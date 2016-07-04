export function getExtraActionAdds(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (!currentChanges.didActionFail) {
        /* This property must exist ([]) */
        changes["addActionToCloudQueue"] = action.getFollowupActions(action, casterState, targetState, currentChanges);
    } else {
        changes["addActionToCloudQueue"] = [];
    }

    return {
        ...currentChanges,
        ...changes
    }
}