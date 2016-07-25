import {assert} from 'chai'
import {
    findMoveThatCanHealStatus,
    findItemThatCanHealStatus,
    findMoveThatCanRecoverHp,
    findAttackThatCanRecoverHp,
    findItemThatCanRecoverHp,
    findAttackThatGivesMePositiveStatus,
    findAttackThatGivesEnemyNegativeStatus,
    doesCombatantHaveItems,
    findMoveThatCanStealItems,
    findLeastExpensivePpMove,
    findMostDamagingAttack
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

describe('doesCombatantHaveItems', () => {
    it('will return true if comb has items', () => {
        assert.isTrue(
            doesCombatantHaveItems({items: ["an-item"]})
        );
    });
    it('will return false if comb does not have items', () => {
        assert.isFalse(
            doesCombatantHaveItems({items: []})
        );
    })
});

describe('findMoveThatCanStealItems', () => {
    it('will return a valid move if we have one', () => {
        assert.ok(
            findMoveThatCanStealItems(["attack-special-004-a"])
        );
    });
    it('will return null if it only has invalid attacks', () => {
        assert.isNull(
            findMoveThatCanStealItems(["attack-special-003-a"])
        );
    });
});

describe('findLeastExpensivePpMove', () => {
    it('will return the move with the lowest PP cost', () => {
        assert.equal(
            findLeastExpensivePpMove({
                attacks: ["attack-special-004-a", "attack-special-000-a", "attack-001-a"]
            }),
            "attack-001-a"
        );
    });
});


describe('findMostDamagingAttack', () => {
    /* THIS IS TRICKY TO TEST, SHOULD INVOLVE RANDOMNESS */
    it('will return the attack with most damaging affectTargetHpPoints', () => {
        assert.ok(
            findMostDamagingAttack({
                attacks: ["attack-001-a", "attack-001-c", "attack-002-c"]
            })
        );
    });
});