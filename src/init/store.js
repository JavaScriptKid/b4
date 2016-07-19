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
        rollout: [],
        submissions: [],
        textMessageContent: [],


        //Menu
        descriptionBarText: "", //for static messaging, like Item descriptions
        menuLevel: "", //"", "attacks", "special", "items", "charged-attacks", "charged-frameworks"
        menuOptionIndex: 1,
        selectedOptionId: "",
        viewMode: "battle" //"console" || "battle"
    },
    map: {
        viewportWidth: 0
    },
    playerData: {
        ...InitialPlayerData
    }
});

export default store;