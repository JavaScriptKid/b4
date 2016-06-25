export function getSuperCharged(action, casterState, targetState, currentChanges) {

    let changes = {};

    changes["isSuperCharged"] = false; /* This property should always exist. true or false. It comes from the submission? */

    return {
        ...currentChanges,
        ...changes
    }
}