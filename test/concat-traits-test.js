import { assert } from 'chai';
import { concatTraits } from '../src/battle/combatants/get-trait-path-choice';

describe('concatTraits', () => {
    it('Gives back an array with all of the trait possibilities', () => {

        const properties = {
            vicious: 2,
            protective: 4,
            cursing: 3,
            conservative: 1
        };

        const result = concatTraits(properties);
        assert.deepEqual(result, [
            "vicious", "vicious",
            "protective", "protective", "protective", "protective",
            "cursing", "cursing", "cursing",
            "conservative"
        ]);
    });
});