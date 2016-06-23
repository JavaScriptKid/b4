/* THIS IS EXPERIMENTAL AND I'LL PROBABLY NOT DO IT. */
export function getStateFromChanges(initialState, orderOfChanges) {

    //var result = {};
    //
    //orderOfChanges.forEach(changes => {
    //    result = {
    //        ...result,
    //        ...changes
    //    }
    //
    //});
    //
    //return result;

    return [initialState, ...orderOfChanges].reduce((a,b) => {
        const next = {
            ...a,
            ...b
        };
        return next;
    });

}

function getRolloutStep(thisAction={}, state={}) { //"Calculations"
    // state = { combatantA: {}, combatantB: {} }

    //cancel if dead

    //replace if lagging

    //did it miss?

    //did it fail?

    //do all the normal stuff




    return {
        rolloutStep: {/*type:"whatever", someCoolThing: "yeah" */ },
        newState: { /*a copy of ...state but with these changes applied */ }
    }
}