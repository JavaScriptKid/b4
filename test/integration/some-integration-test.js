import {assert} from 'chai'
import store from '../../src/init/store'
import initBattleCombatants from '../../src/battle/init-battle-combatants'
import { SubmissionModel } from '../../src/battle/submissions/submission-utilities'


/* These functions require environmental data */
describe('Integration', () => {

    initBattleCombatants();
    var history = store.getState().battle.history;
    var timeIndex = store.getState().battle.devTimeTravelTurn;
    var combatants = { ...history[timeIndex].combatants};

    var player1Id = Object.keys(combatants)[0];
    var player2Id = Object.keys(combatants)[1];


    describe('Submission model', () => {
        it('turns a submission data and adds Speed Roll', () => {
            const result = SubmissionModel("attack-002-a", player1Id, player2Id);
            assert.isDefined(result.speedRoll);
        });
    });


    it('can can go from submissions to rollout queue', () => {

        const submissions = [
            {
                casterId: player1Id,
                targetId: player2Id,
                actionId: "attack-001-a"
            },
            {
                casterId: player2Id,
                targetId: player1Id,
                actionId: "attack-002-a"
            }
        ];

        // console.log(combatants);
        // console.log(submissions);
    });
});