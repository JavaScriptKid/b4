export function getPpChanges(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.ppCost) {
        //Some sort of defense roll?
        changes["affectCasterPp"] = casterState.pp - action.ppCost;
    }

    return {
        ...currentChanges,
        ...changes
    }
}