import { setValue, editNode } from '../helpers/reducer-utilities'

export function battle(state = {}, action) {
    switch (action.type) {
        case "SET_BATTLE_VALUE":
            return setValue(state, action.payload.changes);

        case "MERGE_COMBATANT":

            const currentHistory = [...state.history];
            const lastEntry = currentHistory[ currentHistory.length - 1];

            const node = editNode(lastEntry.combatants, action.payload.key, {
                ...action.payload.changes
            });


            /* Apply changes only to `combatants` in most recent history entry */

            const unTouchedHistoryLog = currentHistory.filter((d,i) => {
                return i < (currentHistory.length-1);
            });

            return {
                ...state,
                history: [
                    ...unTouchedHistoryLog,
                    {
                        cloudQueue: lastEntry.cloudQueue,
                        combatants: {...node}
                    }
                ]
            };

        default:
            return state;
    }
}