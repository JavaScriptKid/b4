import {assert} from 'chai'
import {
    findMoveThatCanHealStatus,
    findItemThatCanHealStatus,
    findMoveThatCanRecoverHp,
    findAttackThatCanRecoverHp,
    findItemThatCanRecoverHp,
    findAttackThatGivesMePositiveStatus,
    findAttackThatGivesEnemyNegativeStatus
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

describe('findMoveThatCanRecoverHp', () => {
    it('will return a valid move if it has one', () => {
        assert.ok(
            findMoveThatCanRecoverHp(["item_002"])
        );
        assert.ok(
            findAttackThatCanRecoverHp({attacks: ["item_002"]}) //This attack is obviously an item. Trying to future proof
        );
        assert.ok(
            findItemThatCanRecoverHp({items: ["item_002"]}) //This attack is obviously an item. Trying to future proof
        )

    });
    it('will return null if it only has invalid items', () => {
        assert.isNull(
            findMoveThatCanRecoverHp(["item_001", "item_003"])
        )
    });
});


describe('findAttackThatGivesMePositiveStatus', () => {
    it('will return a valid move if it has one', () => {
        assert.ok(
            findAttackThatGivesMePositiveStatus({attacks: ["attack-special-007-a"]})
        );
    })
});

describe('findAttackThatGivesEnemyNegativeStatus', () => {
    it('will return a valid move if it has one', () => {
        assert.ok(
            findAttackThatGivesEnemyNegativeStatus({attacks: ["attack-special-003-a"]})
        );
    })
});