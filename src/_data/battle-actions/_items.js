import actionSchema from './battle-action-schema'

const itemSchema = {
    ...actionSchema,
    type: "Item",
    animation: "slideDown"
};

export default {
    "item_001": {
        ...itemSchema,
        name: "Network Reset Code",
        description: "Fixes lagging",
        affectCasterStatus: ["lag", "normal"]
    },
    "item_002": {
        ...itemSchema,
        name: "Mini Battery Pack",
        description: "Recovers 10 HP",
        affectCasterHpPoints: 10
    }
}