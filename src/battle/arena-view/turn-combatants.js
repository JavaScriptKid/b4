import store from '../../init/store'
import {setCombatantValue} from '../../redux-action-creators/battle-action-creators'

export function turnCombatantsForSubmissions() {
    const history = store.getState().battle.history;
    const combs = history[history.length-1].combatants;

    //Turn both characters to face for Submission
    const combIds = Object.keys(combs);
    //Player
    setCombatantValue(combIds[0], {
        animation: "turnToFaceDown 0.2s steps(2, end) forwards"
    });
    //Computer
    setCombatantValue(combIds[1], {
        animation: "turnToFaceUp 0.2s steps(2, end) forwards"
    });

}


export function turnCombatantsForRollout() {

    const history = store.getState().battle.history;
    const combs = history[history.length-1].combatants;

    //Turn both characters to face for Submission
    const combIds = Object.keys(combs);
    //Player
    setCombatantValue(combIds[0], {
        animation: "turnToFaceUp 0.2s steps(2, end) forwards"
    });
    //Computer
    setCombatantValue(combIds[1], {
        animation: "turnToFaceDown 0.2s steps(2, end) forwards"
    });

}