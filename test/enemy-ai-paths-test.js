import {assert} from 'chai'
import {findMoveThatCanHealStatus} from '../src/battle/combatants/enemy-ai-paths'

describe('findMoveThatCanHealStatus', () => {
    it('will return a valid move if it has one', () => {
        const combatantModel = {
            status: "lag",
            attacks: [
                "attack-special-006-a"
            ]
        };
        assert.ok( findMoveThatCanHealStatus(combatantModel))
    });
    it('will return null if it does not have anything valid', () => {
        const combatantModel = {
            status: "lag",
            attacks: [
                "attack-special-001-a"
            ]
        };
        assert.isNull( findMoveThatCanHealStatus(combatantModel))
    });
});