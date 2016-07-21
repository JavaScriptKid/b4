import {assert} from 'chai'
import {
    findMoveThatCanHealStatus,
    findItemThatCanHealStatus
} from '../src/battle/combatants/enemy-ai-paths'

describe('findMoveThatCanHealStatus', () => {
    it('will return a valid move if it has one', () => {
        assert.ok(
            findMoveThatCanHealStatus(["attack-special-006-a"], "lag")
        )
    });
    it('will return null if it does not have anything valid', () => {
        assert.isNull(
            findMoveThatCanHealStatus(["attack-special-001-a"], "lag")
        )
    });
});

describe('findItemThatCanHealStatus', () => {
    it('will return a valid move if it has one', () => {
        const combatantModel = {
            status: "lag",
            items: ["item_001"]
        };
        assert.ok(
            findItemThatCanHealStatus(combatantModel)
        )
    });
    it('will return null if it only has invalid items', () => {
        const combatantModel = {
            status: "lag",
            items: ["item_002", "item_003"]
        };
        assert.isNull(
            findItemThatCanHealStatus(combatantModel)
        )
    });
    it('will return null if it has an empty list', () => {
        const combatantModel = {
            status: "lag",
            items: []
        };
        assert.isNull(
            findItemThatCanHealStatus(combatantModel)
        )
    });
});