import actionSchema from './battle-action-schema'

const attackSchema = {
    ...actionSchema,
    levelRequirement: 0,
    type: "Normal",
    dependentOnAttack: null //"action_attack_whatever_001"
};

/* NOTE: These special attacks include `useFrameworkId` property which is a string of the framework to use */
/* The menu-model will automatically apply the selected framework based on the value of this property */

export default {
    "super-001-a": {
        ...attackSchema,
        name: "SUPER Palm",
        useFrameworkId: "framework_001",
        animation: "tada",
        description: "Focus PALM knowledge in one powerful blow",
        affectTargetHpPoints: -5,
        ppCost: 0
    },
    "super-002-a": {
        ...attackSchema,
        name: "SUPER EndGame",
        useFrameworkId: "framework_002",
        animation: "tada",
        description: "Focus EndGame knowledge in one powerful blow",
        affectTargetHpPoints: -5,
        ppCost: 0
    },
    "super-003-a": {
        ...attackSchema,
        name: "SUPER edjKase",
        useFrameworkId: "framework_003",
        animation: "tada",
        description: "Focus edjKase knowledge in one powerful blow",
        affectTargetHpPoints: -5,
        ppCost: 0
    },
    "super-004-a": {
        ...attackSchema,
        name: "SUPER Vector",
        useFrameworkId: "framework_004",
        animation: "tada",
        description: "Focus Vector knowledge in one powerful blow",
        affectTargetHpPoints: -5,
        ppCost: 0
    },
}