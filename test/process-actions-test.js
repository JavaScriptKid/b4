import { assert } from 'chai';
import { getSubactions } from '../src/battle/process-actions.js';

describe('getSubactions', () => {
    it('breaks memoryleak characters into the intent and memory leak actions', () => {

        const action = {
            casterId: 'a',
            targetId: 'b',
            actionId: 'attack-002-a'
        };
        const combatantState = {
            status: "memory-leak"
        };

        const result = getSubactions(action, combatantState)
        assert.equal(result.length, 2);
    });
});