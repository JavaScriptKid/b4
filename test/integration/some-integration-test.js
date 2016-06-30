import {assert} from 'chai'
import store from '../../src/init/store'
import initBattleCombatants from '../../src/battle/init-battle-combatants'

describe('Integration', () => {
    it('can can go from submissions to rollout queue', () => {
        initBattleCombatants();
        const history = store.getState().battle.history;
        const timeIndex = store.getState().battle.devTimeTravelTurn;
        const combatants = { ...history[timeIndex].combatants};

        const player1Id = Object.keys(combatants)[0];
        const player2Id = Object.keys(combatants)[1];

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

        console.log(combatants);
        console.log(submissions);
    });
});