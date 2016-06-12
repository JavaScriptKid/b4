const frameworkSchema = {
    name: "someFrameworkName",
    playerProperty: ""
};

export default {
    "F1": {
        ...frameworkSchema,
        name: "Palm",
        playerProperty: "f1Alignment"
    },
    "F2": {
        ...frameworkSchema,
        name: "EndGame",
        playerProperty: "f2Alignment"

    },
    "F3": {
        ...frameworkSchema,
        name: "edjKase",
        playerProperty: "f3Alignment"

    },
    "F4": {
        ...frameworkSchema,
        name: "Vector",
        playerProperty: "f4Alignment"

    }
}