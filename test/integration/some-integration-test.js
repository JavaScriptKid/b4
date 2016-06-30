import {assert} from 'chai'
import store from '../../src/init/store'
import initBattleCombatants from '../../src/battle/init-battle-combatants'

describe('Integration', () => {
    it('can can go from submissions to rollout queue', () => {
        initBattleCombatants();
        const history = store.getState().battle.history;
        const timeIndex = store.getState().battle.devTimeTravelTurn;
        const combatants = { ...history[timeIndex].combatants};

        const submissions = [
            {
                casterId: Object.keys(combatants)[0],
                targetId: Object.keys(combatants)[1],
                actionId: "attack-001-a"
            },
            {
                casterId: Object.keys(combatants)[1],
                targetId: Object.keys(combatants)[0],
                actionId: "attack-002-a"
            }
        ];

        console.log(combatants)
        console.log(submissions)
    });
});