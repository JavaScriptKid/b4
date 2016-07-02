import actionSchema from './battle-action-schema'

export default {
    /* Death */
    "natural-death-a": {
        ...actionSchema,
        customSuccessStep: function(action, casterModel, targetModel, actionDescription) {
            return [
                {
                    type: "message",
                    content: [`${casterModel.name} has run out of battery life`]
                }
            ]
        }
    }
}