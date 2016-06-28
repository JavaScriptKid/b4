const useMessage = {
        type: "message",
        content: [
            "{casterName} used ",
            "@@pause_300@@",
            "[FAST]{actionName}!"
        ]
    };

export default {
    "theStandard": [
        useMessage,
        {
            type: "animation",
            animationName: "{animationName}", /* Idk how this should be passed in. Probably not as a string template like this */
            data: {}
        },
        {
            type: "stateChange",
            //?
        }
    ],
    "theExtra": [
        useMessage,
        {
            type: "animation",
            animationName: "{animationName}", /* Idk how this should be passed in. Probably not as a string template like this */
            data: {}
        },
        {
            type: "stateChange",
            //?
        },
        {
            type: "message",
            content: [
                "Some other line of text. It hit 3 times?!"
            ]
        }
    ],
    "theMiss": [
        useMessage,
        {
            type: "message",
            content: [
                "[FAST]but it missed!"
            ]
        }
    ]
}