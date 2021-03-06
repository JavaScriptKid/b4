import { assert } from 'chai';
import { getMergedCombatantState } from '../src/battle/get-merged-combatant-state';

describe('mergeCombatantState', () => {
    it('merges two combatant objects (one level deep)', () => {

        const currentState = {
            cloudQueue: [],
            combatants: {
                "a": {
                    valueA: "red",
                    valueB: "blue",
                    valueC: "green"
                },
                "b": {
                    valueA: "red",
                    valueB: "blue",
                    valueC: "green"
                }
            }
        };
        const nextStateChanges = {
            cloudQueue: [],
            combatants: {
                "a": {
                    valueB: "orange",
                    valueC: "purple"
                },
                "b": {
                    valueA: "pink",
                    valueZ: "cyan"
                }
            }
        };

        assert.deepEqual( getMergedCombatantState(nextStateChanges, currentState), {
            cloudQueue: [],
            combatants: {
                "a": {
                    valueA: "red",
                    valueB: "orange",
                    valueC: "purple"
                },
                "b": {
                    valueA: "pink",
                    valueB: "blue",
                    valueC: "green",
                    valueZ: "cyan"
                }
            }
        })
    });
});