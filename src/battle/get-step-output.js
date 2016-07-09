const getUseMessage = function(action, casterModel, targetModel, actionDescription) {

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

var getMissStep = function(action, casterModel, targetModel, actionDescription) {

    /* If actionDescription has MISS property, check for a custom return or use default */
    if (actionDescription.didActionMiss) {

        if (typeof action.customMissStep === "function") {
            return action.customMissStep(action, casterModel, targetModel, actionDescription);
        }
        return [
            getUseMessage(action, casterModel, targetModel, actionDescription),
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

var getFailStep = function(action, casterModel, targetModel, actionDescription) {

    /* If actionDescription has FAIL property, check for a custom return or use default */
    if (actionDescription.didActionFail) {
        if (typeof action.customFailStep === "function") {
            return action.customFailStep(action, casterModel, targetModel, actionDescription);
        }

        return [
            getUseMessage(action, casterModel, targetModel, actionDescription),
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


var getSuccessStep = function(action, casterModel, targetModel, actionDescription) {
    if (typeof action.customSuccessStep === "function") {
        return action.customSuccessStep(action, casterModel, targetModel, actionDescription);
    }

    return [
        getUseMessage(action, casterModel, targetModel, actionDescription),
        {
            type: "animation",
            animationName: action.animation
        }
    ]
};



export function getStepOutput(action, casterModel, targetModel, actionDescription) {

    /* FOR NOW */
    let result = getMissStep(action, casterModel, targetModel, actionDescription);
    if (!result) {
        result = getFailStep(action, casterModel, targetModel, actionDescription);
    }
    if (!result) {
        result = getSuccessStep(action, casterModel, targetModel, actionDescription);
    }
    return result;
}
