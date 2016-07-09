/* This file describes how the Framework factions interact with each other */

const frameworkSchema = {
    name: "someFrameworkName",
    playerProperty: ""
};


export default {
    "framework_001": {
        ...frameworkSchema,
        name: "Palm",
        playerProperty: "f1Alignment",
        strongAgainst: ["framework_002"],
        weakAgainst: ["framework_004"]
    },
    "framework_002": {
        ...frameworkSchema,
        name: "EndGame",
        playerProperty: "f2Alignment",
        strongAgainst: ["framework_003"],
        weakAgainst: ["framework_001"]
    },
    "framework_003": {
        ...frameworkSchema,
        name: "edjKase",
        playerProperty: "f3Alignment",
        strongAgainst: ["framework_004"],
        weakAgainst: ["framework_002"]
    },
    "framework_004": {
        ...frameworkSchema,
        name: "Vector",
        playerProperty: "f4Alignment",
        strongAgainst: ["framework_001"],
        weakAgainst: ["framework_003"]
    }
}