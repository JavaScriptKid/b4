export function getMiss(action, casterState, targetState, currentChanges) {

    let changes = {};

    changes["didActionMiss"] = false; /* TODO: add real missing logic. This property should always exist. true or false */

    return {
        ...currentChanges,
        ...changes
    }
}