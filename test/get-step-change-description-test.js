import { assert } from 'chai';
import getStepChangeDescriptionObject from '../src/battle/get-step-state-change-description-object'
import BattleActionSchema from '../src/_data/battle-action-schema'

describe('PP Changes', () => {
    it('reduces the caster\'s PP by the correct amount', () => {

        const action = {
            ...BattleActionSchema,
            ppCost: 10
        };
        const caster = {
            pp: 30
        };
        const target = {};

        assert.equal(getStepChangeDescriptionObject(action, caster, target).affectCasterPp, 20)
    });
});

describe('Missing', () => {
    it('adds a property for missing', () => {

        const action = {
            ...BattleActionSchema
        };
        const caster = {
        };
        const target = {};

        assert.isDefined(getStepChangeDescriptionObject(action, caster, target).didActionMiss)
    });
});


describe('Regular attacks', () => {
    it('describes hp being changed', () => {

        const action = {
            ...BattleActionSchema,
            affectTargetHpPoints: 10
        };
        const caster = {
        };
        const target = {
            hp: 100
        };

        assert.isDefined( getStepChangeDescriptionObject(action, caster, target).affectTargetHp )
    });

    it('describes repetitions', () => {

        const action = {
            ...BattleActionSchema,
            affectTargetHpPoints: 2,
            repetitions: [2,5]
        };
        const caster = {
        };
        const target = {
            hp: 100
        };

        assert.isDefined( getStepChangeDescriptionObject(action, caster, target).repetitionsCount )
        assert.isDefined( getStepChangeDescriptionObject(action, caster, target).affectTargetHp )
    });
});

describe('Status Changes', () => {
    it('describes statuses being changed', () => {

        const action = {
            ...BattleActionSchema,
            affectTargetStatus: "lag"
        };
        const caster = {};
        const target = {};

        assert.isDefined(getStepChangeDescriptionObject(action, caster, target).affectTargetStatus)
    });
});