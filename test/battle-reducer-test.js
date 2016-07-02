import { assert } from 'chai';
import { battle } from '../src/redux-reducers/battle-reducer';

describe('battle reducer', () => {

    describe('MERGE_COMBATANT', () => {
        it('properly edits the last version of state history', () => {

            const state = {
                devTimeTravelTurn: 0,
                history: [
                    { // #0
                        cloudQueue: [],
                        combatants: {
                            a: { hp: 100 },
                            b: { hp: 100 }
                        }
                    },
                    { // #1
                        cloudQueue: [],
                        combatants: {
                            a: { hp: 89 },
                            b: { hp: 100 }
                        }
                    },
                    { // #2
                        cloudQueue: [],
                        combatants: {
                            a: { hp: 50 },
                            b: { hp: 50 }
                        }
                    }
                ]
            };

            const action = {
                type: "MERGE_COMBATANT",
                payload: {
                    key: "a",
                    changes: {
                        hp: 40
                    }
                }
            };

            const result = battle(state, action);
            assert.equal(result.history.length, 3);
            assert.equal(result.history[2].combatants.a.hp, 40);

        });
    });
});