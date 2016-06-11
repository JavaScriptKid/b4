import { setValue, editNode } from '../helpers/reducer-utilities'

export function battle(state = {}, action) {
    switch (action.type) {
        case "SET_BATTLE_VALUE":
            return setValue(state, action.payload.changes);

        case "MERGE_COMBATANT":
            const node = editNode(state.combatants, action.payload.key, {
                ...action.payload.changes
            });

            return {
                ...state,
                combatants: node
            };

        default:
            return state;
    }
}