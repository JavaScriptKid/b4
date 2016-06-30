const useMessage = {
    type: "message",
    content: [
        "{casterName} used ",
        "@@pause_300@@",
        "[FAST]{actionName}!"
    ]
};

var getMissStep = function(action, actionDescription) {
    if (typeof action.customMissStep === "function") {
        return action.customMissStep();
    }
    return [
        useMessage,
        {
            type: "stateChange",
            combatantChanges: { //example
                "comb01": {
                    pp: 45
                }
            }

        },
        {
            type: "message",
            content: [
                "but it missed!"
            ]
        }
    ]
};


export function getStepOutput(action, casterModel, targetModel, actionDescription) {
    let result = getMissStep(action);
    if (!result) {
        result = getFailStep(action, actionDescription);
    }
    if (!result) {
        result = action.getSuccessStep(action, actionDescription);
    }
    return result;
};



//    "theStandard": [
//        useMessage,
//        {
//            type: "animation",
//            animationName: "{animationName}", /* Idk how this should be passed in. Probably not as a string template like this */
//            data: {}
//        },
//        {
//            type: "stateChange",
//            //?
//        }
//    ],
//    "theExtra": [
//        useMessage,
//        {
//            type: "animation",
//            animationName: "{animationName}", /* Idk how this should be passed in. Probably not as a string template like this */
//            data: {}
//        },
//        {
//            type: "stateChange",
//            //?
//        },
//        {
//            type: "message",
//            content: [
//                "Some other line of text. It hit 3 times?!"
//            ]
//        }
//    ],
//    "theMiss": [
//        useMessage,
//        {
//            type: "message",
//            content: [
//                "[FAST]but it missed!"
//            ]
//        }
//    ]
//}
