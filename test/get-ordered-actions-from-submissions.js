import {assert} from 'chai'
import {getOrderedActionsFromSubmissions} from '../src/battle/submissions/submission-utilities'

describe('getOrderedActionsFromSubmissions', () => {
    it('can can go from submissions to rollout queue', () => {

        const submissions = [
            {
                casterId: "a",
                targetId: "b",
                actionId: "attack-001-a",
                speedRoll: 8
            },
            {
                casterId: "b",
                targetId: "a",
                actionId: "attack-002-a",
                speedRoll: 20
            }
        ];

        assert.equal(getOrderedActionsFromSubmissions(submissions)[0].casterId, "b");
        assert.equal(getOrderedActionsFromSubmissions(submissions)[1].casterId, "a");
    });
});
