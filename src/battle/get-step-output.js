const getUseMessage = function(action, casterModel, targetModel, actionDescription) {
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
            return action.customMissStep();
        }
        return [
            getUseMessage(),
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
            return action.customFailStep();
        }

        return [
            getUseMessage(action, casterModel, targetModel),
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
        return action.customSuccessStep();
    }

    return [
        getUseMessage(action, casterModel, targetModel),
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
