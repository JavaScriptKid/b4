const storySchema = {
    name: "unnamed story",
    entries: []
};
const entrySchema = {
    entryId: "entry-000",
    entryDescription: "some entryDescription",
};

export default {
    "betaStory_some-quest-1" : {
        ...storySchema,
        name: "A Jerk Named Berg",
        entries: [
            {
                ...entrySchema,
                entryId: "entry-001",
                entryDescription: "You discovered the first quest in The Danger Crew. Nice work. Keep walking around."
            },
            {
                ...entrySchema,
                entryId: "entry-002",
                entryDescription: "You've defeated Berg, the angry redhead. He seems to be in a better mood now. The local devs are starting to notice you!"
            }
        ]
    },
    "betaStory_some-quest-2" : {
        ...storySchema,
        name: "Stranger in the Woods",
        entries: [
            {
                ...entrySchema,
                entryId: "entry-001",
                entryDescription: "Glenn warned you about a mysterious hooded figure in the woods north of Shaw Park."
            },
            {
                ...entrySchema,
                entryId: "entry-002",
                entryDescription: "You've identified the hooded figure as an early partner at MacroDome. He asked you to follow him to his hut in the woods."
            },
            {
                ...entrySchema,
                entryId: "entry-003",
                entryDescription: "You've acquired a rare laptop part for defeating the hooded figure."
            }
        ]
    }
}

/*
    Example player state:

    storyPoints: {
        journalStories: {
            "betaStory_some-quest-1": ["entry-001", "entry-002"],
            "betaStory_some-quest-2": ["entry-001", "entry-004"], // You may have skipped the other entries?
        }
    }

 */