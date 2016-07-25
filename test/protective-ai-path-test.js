import {assert} from 'chai'
import {protectiveAiPath} from '../src/battle/combatants/ai-paths/protective-ai-path'

describe('protectiveAiPath', () => {
    it('heals a negative status if I have a valid Attack', () => {
        const model = {
            status: "lag",
            attacks: ["attack-special-006-a"]
        };
        const result = protectiveAiPath(model, {});
        assert.equal(result.actionId, "attack-special-006-a")
    });

    it('heals a negative status if I have a valid Item but not attack', () => {
        const model = {
            status: "lag",
            attacks: ["attack-001-a"],
            items: ["item_001"] //Network Reset Code
        };
        const result = protectiveAiPath(model, {});
        assert.equal(result.actionId, "item_001")
    });

    it('will heal HP if I have less than full hp and a valid item', () => {
        const model = {
            status: "lag",
            hp: 9,
            maxHp: 10,
            attacks: ["attack-001-a"],
            items: ["item_002"] //Mini Battery Pack
        };
        const result = protectiveAiPath(model, {});
        assert.equal(result.actionId, "item_002")
    });

    it('will use a positive status Attack if status is normal', () => {
        const model = {
            status: "normal",
            hp: 10,
            maxHp: 10,
            attacks: ["attack-001-a", "attack-special-009-a"],
            items: ["item_002"] //Mini Battery Pack
        };
        const result = protectiveAiPath(model, {});
        assert.equal(result.actionId, "attack-special-009-a")
    });


    it('will be null if no path can be found', () => {
        const model = {
            status: "normal",
            hp: 10,
            maxHp: 10,
            attacks: ["attack-001-a"],
            items: ["item_002"] //Mini Battery Pack
        };

        const result = protectiveAiPath(model, {});
        assert.isNull(result)
    })

});