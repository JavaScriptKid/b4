import createStore from './create-store'
import InitialPlayerData from './initial-player-data'

const mockCurrentUser = {
    email: "drewconley@gmail.com",
};

const store = createStore({
    battle: {
        devTimeTravelTurn: 0,
        history: [
            /*
            {
                cloudQueue: [],
                combatants: {}
            }
            */
        ],
        turnRolloutHistoryEntries: [
            { turnId: 0, steps: [] }
        ],
        rollout: [
            //{type:"message", content: ["Begin Hack Battle"]}
        ],
        currentAnimation: null,

        submissions: [],
        textMessageContent: [],

        result: {}, //"result" from executeTurn preserved during rollout


        //Menu
        descriptionBarText: "", //for static messaging, like Item descriptions
        menuLevel: "", //"", "attacks", "special", "items", "charged-attacks", "charged-frameworks"
        menuOptionIndex: 1,
        selectedOptionId: "",
        viewMode: "reporting" //"console" || "battle" || "reporting"
    },
    map: {
        viewportWidth: 0
    },
    playerData: {
        ...InitialPlayerData
    }
});

export default store;