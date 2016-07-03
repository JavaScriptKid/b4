export function getExtraActionAdds(action, casterState, targetState, currentChanges) {

    let changes = {};

    changes["addActionToCloudQueue"] = action.getFollowupActions(action, casterState, targetState, currentChanges);
    // []

    return {
        ...currentChanges,
        ...changes
    }
}