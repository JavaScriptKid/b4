export function getStatusChanges(action, casterState, targetState, currentChanges) {

    let changes = {};

    if (action.affectTargetStatus) {
        //Some sort of defense roll?
        changes["affectTargetStatus"] = validateNewValue(action.affectTargetStatus, targetState);
    }

    if (action.affectCasterStatus) {
        //Some sort of defense roll?
        changes["affectCasterStatus"] = validateNewValue(action.affectCasterStatus, casterState);
    }

    /* Remove null keys after validation */
    for (var key in changes) {
        if (changes[key] === null) {
            delete changes[key];
        }
    }

    return {
        ...currentChanges,
        ...changes
    }
}

/* Support both string syntax and array syntax */
function validateNewValue(newValue, combatantState) {
    if (typeof newValue == "string") {
        return newValue
    }

    if (Array.isArray(newValue)) {
        if (combatantState.status == newValue[0]) {
            return newValue[1];
        }
    }
    return null;
}