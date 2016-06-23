import { assert } from 'chai';
import {getStateFromChanges} from '../src/battle/process-state-change'

describe('Process State Change', () => {
    it('can do something cool', () => {

        const initialState = {
            a: 5,
            b: 0
        };

        const orderOfChanges = [
            {a: 3},
            {a: 2, b: 4},
            {a: 1},
            {a: 10}
        ];

        const result = getStateFromChanges(initialState, orderOfChanges);
        assert.deepEqual(result.a, 10);
        assert.deepEqual(result.b, 4);





    });
});