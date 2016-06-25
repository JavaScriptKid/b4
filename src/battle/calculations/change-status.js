export function getStatusChanges(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.affectTargetStatus) {
        //Some sort of defense roll?
        changes["affectTargetStatus"] = action.affectTargetStatus;
    }

    return {
        ...currentChanges,
        ...changes
    }
}