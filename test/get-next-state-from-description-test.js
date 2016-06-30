import { assert } from 'chai';
import { nextStateFromDescription } from '../src/battle/get-next-state-from-description';

describe('getNextStateFromDescription', () => {
    it('generates new state for hp and pp changes', () => {

        const descriptionObject = {
            targetId: "a",
            casterId: "b",
            affectCasterPp: -2,
            affectTargetHp: -18
        };
        const state = {
            "a": {
                hp: 20
            },
            "b": {
                pp: 50
            }
        };

        assert.deepEqual( nextStateFromDescription(descriptionObject, state), {
            "a": {
                hp: 2
            },
            "b": {
                pp: 48
            }
        })
    });

    it('generates new state for status changes', () => {

        const descriptionObject = {
            targetId: "a",
            casterId: "b",
            affectCasterPp: -2,
            affectTargetStatus: "lag",
            affectCasterStatus: "normal" //Let's say this attack can cure my status but also give you a status...
        };
        const state = {
            "a": {
                hp: 20,
                status: "normal"
            },
            "b": {
                pp: 50,
                status: "some-bad-status"
            }
        };

        assert.deepEqual( nextStateFromDescription(descriptionObject, state), {
            "a": {
                status: "lag"
            },
            "b": {
                pp: 48,
                status: "normal"
            }
        })
    });
});