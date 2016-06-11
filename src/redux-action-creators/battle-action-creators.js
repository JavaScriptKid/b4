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