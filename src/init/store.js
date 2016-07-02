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

        ],
        viewMode: "console" //"console" || "battle"
    },
    map: {
        viewportWidth: 0
    },
    playerData: {
        ...InitialPlayerData
    }
});

export default store;