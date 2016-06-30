import { assert } from 'chai';
import {getStepDescriptionObject} from '../src/battle/get-step-description-object'
import BattleActionSchema from '../src/_data/battle-actions/battle-action-schema'

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

        assert.equal(getStepDescriptionObject(action, caster, target).affectCasterPp, 20)
    });
});

describe('Super Charged', () => {
    it('adds a property for being Super Charged', () => {

        const action = {
            ...BattleActionSchema
        };
        const caster = {};
        const target = {};

        assert.isDefined(getStepDescriptionObject(action, caster, target).isSuperCharged)
    });
});

describe('Missing', () => {
    it('adds a property for missing', () => {

        const action = {
            ...BattleActionSchema
        };
        const caster = {};
        const target = {};

        assert.isDefined(getStepDescriptionObject(action, caster, target).didActionMiss)
    });
});


describe('Regular attacks', () => {
    it('describes hp being changed', () => {

        const action = {
            ...BattleActionSchema,
            affectTargetHpPoints: 10
        };
        const caster = {};
        const target = {
            hp: 100
        };

        assert.isDefined( getStepDescriptionObject(action, caster, target).affectTargetHp )
    });

    it('describes repetitions', () => {

        const action = {
            ...BattleActionSchema,
            affectTargetHpPoints: 2,
            repetitions: [2,5]
        };
        const caster = {};
        const target = {
            hp: 100
        };

        assert.isDefined( getStepDescriptionObject(action, caster, target).repetitionsCount )
        assert.isDefined( getStepDescriptionObject(action, caster, target).affectTargetHp )
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

        assert.isDefined(getStepDescriptionObject(action, caster, target).affectTargetStatus)
    });
});