import store from '../init/store'

export function setBattleValue(changes={}) {
    store.dispatch({
        type: "SET_BATTLE_VALUE",
        payload: {
            changes: {...changes}
        }
    });
}

export function setCombatantValue(combatantId="", changes={}) {
    store.dispatch({
        type: "MERGE_COMBATANT",
        payload: {
            key: combatantId,
            changes: {...changes}
        }
    });
}


export function setLatestHistory(newHistoryState={}) {
    /* { cloudQueue:[], combatants:{} } */

    const history = store.getState().battle.history;
    const revisedHistory = history.map((entry,i) => {
        //Replace last entry with new History state
        if (i == history.length-1) {
            return {...newHistoryState}
        }
        return entry;
    });

    setBattleValue({
        history: revisedHistory
    })

}