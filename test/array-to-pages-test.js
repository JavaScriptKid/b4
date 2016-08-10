import { assert } from 'chai';
import { getPagesFromArray } from '../src/helpers/array-to-pages';

describe('getPagesFromArray', () => {
    it('will return an array of "page" arrays', () => {

        const dataset = [
            "a","b","c","d","e"
        ];
        const result = getPagesFromArray(dataset, 2);
        const expected = [
            ["a","b"],
            ["c","d"],
            ["e"]
        ];

        assert.deepEqual(result, expected);
    });
    it('will return an even array of "page" arrays', () => {

        const dataset = [
            "a","b","c","d","e","f"
        ];
        const result = getPagesFromArray(dataset, 3);
        const expected = [
            ["a","b","c"],
            ["d","e","f"]
        ];
        assert.deepEqual(result, expected);
    });
});