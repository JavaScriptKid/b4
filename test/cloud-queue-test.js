import { assert } from 'chai'
import {
    removeQueueSlot,
    addQueuedSubmissions,
    extractQueuedSubmissions } from '../src/battle/cloud-queue'

describe(`removeQueueSlot`, () => {
    it (`returns a copy of the array without the first entry`, () => {
        const array = [1,2,3,4,5];
        assert.deepEqual( removeQueueSlot(array), [2,3,4,5])
    });

    it (`returns an empty array if no queuedSubmissions present`, () => {
        assert.deepEqual( removeQueueSlot([]), [])
    });
});

describe(`addQueuedSubmissions`, () => {
    it(`adds submissions to the next turn`, () => {
        const train = [];
        const newTrain = addQueuedSubmissions(train, "a", 1);
        assert.deepEqual(newTrain, [ ["a"] ])
    });

    it(`adds submissions further back in the train`, () => {
        const train = [];
        const newTrain = addQueuedSubmissions(train, "a", 4);
        assert.deepEqual(newTrain, [ [], [], [], ["a"] ])
    });

    it(`adds submissions to an existing turn`, () => {
        const train = [ ["a"] ];
        const newTrain = addQueuedSubmissions(train, "b", 1);
        assert.deepEqual(newTrain, [ ["a", "b"] ])
    });

    it(`adds submissions to an existing turn further back in the train`, () => {
        const train = [ ["a"], [], [], ["b"] ];
        const newTrain = addQueuedSubmissions(train, "c", 4);
        assert.deepEqual(newTrain, [ ["a"], [], [], ["b", "c"] ])
    });


});

describe(`extractQueuedSubmissions`, () => {
    it(`returns whatever is first in the array chain`, () => {
        const queuedSubmissions = [
            [{data: "dog"}, {data: "cat"}],
            [],
            [{data: "fish"}, {data: "lobster"}]
        ];
        assert.deepEqual(
            extractQueuedSubmissions(queuedSubmissions),
            [{data: "dog"}, {data: "cat"}]
        )
    });

    it(`returns an empty array if nothing there`, () => {
        const queuedSubmissions = [
            [],
            [{data: "dog"}, {data: "cat"}],
            [{data: "fish"}, {data: "lobster"}]
        ];
        assert.deepEqual(
            extractQueuedSubmissions(queuedSubmissions),
            []
        )
    });


});