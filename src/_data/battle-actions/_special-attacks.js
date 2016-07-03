import actionSchema from './battle-action-schema'

const specialAttackSchema = {
    ...actionSchema,
    levelRequirement: 0,
    type: "Special",
    dependentOnAttack: null //"action_attack_whatever_001"
};

export default {
    /* Slice */
    "attack-special-001-a": {
        ...specialAttackSchema,
        name: "DDoS",
        description: "Causes opponent to lag out",
        ppCost: 6,
        affectTargetStatus: ["normal", "lag"],
        getFollowupActions: function (action, casterState, targetState, currentChanges) {
            return [
                {
                    action: {
                        targetId: currentChanges.targetId,
                        casterId: currentChanges.targetId,
                        actionId: "natural-recover-lag"
                    },
                    turnRange: [2, 5]
                }
            ]
        }
    }
}