const getUseMessage = function(action, casterModel, targetModel, actionDescription, nextState) {

    if (action.superChargedFrameworkId) {
        return {
            type: "message",
            content: [
                `${casterModel.name} SUPER CHARGED ${action.name} with the power of `,
                `[FAST]${actionDescription.frameworkName.toUpperCase()}`
            ]
        }
    }


    return {
        type: "message",
        content: [
            `${casterModel.name} used `,
            "@@pause_300@@",
            `[FAST]${action.name}!`
        ]
    }
};

var getMissStep = function(action, casterModel, targetModel, actionDescription, nextState) {

    /* If actionDescription has MISS property, check for a custom return or use default */
    if (actionDescription.didActionMiss) {

        if (typeof action.customMissStep === "function") {
            return action.customMissStep(action, casterModel, targetModel, actionDescription, nextState);
        }
        return [
            getUseMessage(action, casterModel, targetModel, actionDescription, nextState),
            {
                type: "message",
                content: [
                    "but it missed!"
                ]
            }
        ]
    }
    /* Did not miss, carry on! */
    return null;
};

var getFailStep = function(action, casterModel, targetModel, actionDescription, nextState) {

    /* If actionDescription has FAIL property, check for a custom return or use default */
    if (actionDescription.didActionFail) {
        if (typeof action.customFailStep === "function") {
            return action.customFailStep(action, casterModel, targetModel, actionDescription, nextState);
        }

        return [
            getUseMessage(action, casterModel, targetModel, actionDescription, nextState),
            {
                type: "message",
                content: [
                    "but it failed."
                ]
            }
        ]
    }
    /* Did not fail, carry on! */
    return null;
};


var getSuccessStep = function(action, casterModel, targetModel, actionDescription, nextState) {
    if (typeof action.customSuccessStep === "function") {
        return action.customSuccessStep(action, casterModel, targetModel, actionDescription, nextState);
    }

    return [
        getUseMessage(action, casterModel, targetModel, actionDescription, nextState),
        {
            type: "animation",
            animationName: action.animation,
            actionDescription: actionDescription //Animation will use this for certain details
        }
    ]
};



export function getStepOutput(action, casterModel, targetModel, actionDescription, nextState) {

    let result = getMissStep(action, casterModel, targetModel, actionDescription, nextState);
    if (!result) {
        result = getFailStep(action, casterModel, targetModel, actionDescription, nextState);
    }
    if (!result) {
        result = getSuccessStep(action, casterModel, targetModel, actionDescription, nextState);
    }
    return result;
}
