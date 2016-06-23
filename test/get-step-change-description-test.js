import { assert } from 'chai';
import getStepChangeDescriptionObject from '../src/battle/get-step-state-change-description-object'
import BattleActionSchema from '../src/_data/battle-action-schema'

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

        assert.isDefined( getStepChangeDescriptionObject(action, caster, target).affectCasterHp )
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
        assert.isDefined( getStepChangeDescriptionObject(action, caster, target).affectCasterHp )
    });
});