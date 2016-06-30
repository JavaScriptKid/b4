import {assert} from 'chai'
import store from '../../src/init/store'
import initBattleCombatants from '../../src/battle/init-battle-combatants'

describe('Integration', () => {
    it('can can go from submissions to rollout queue', () => {
        initBattleCombatants();
        const state = store.getState().battle;


        console.log(state)
    });
});