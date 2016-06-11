const defaultModel = {
    name: "someName",
    description: "someDescription",
    validParts: [],
    sellValue: 0, /* How many coins you get for selling */
    attackSlots: 3, /* How many attacks can you hold? */
};

export default {
    "laptop_model_000": {
        ...defaultModel,
        name: "The Intern",
        description: `"It's pretty dusty, but it should still work."`,
        validParts: ["laptopRam", "laptopDrive"],
        sellValue: 0
    },
    "laptop_model_001": {
        ...defaultModel,
        name: "SliceBook XII",
        description: `Book of slicing`,
        validParts: ["laptopRam", "laptopScreen", "laptopKeyboard", "laptopDrive"],
        sellValue: 55,
        attackSlots: 4
    }
}