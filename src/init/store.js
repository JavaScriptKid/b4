import createStore from './create-store'
import InitialPlayerData from './initial-player-data'

const mockCurrentUser = {
    email: "drewconley@gmail.com",
};

const viewMode = localStorage.getItem("b4CurrentView") || "battle";

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

        submissions: [
        ],
        textMessageContent: [
        ],

        result: {}, //"result" from executeTurn preserved during rollout


        //Menu
        descriptionBarText: "", //for static messaging, like Item descriptions
        selectedOptionId: "root_attack",
        menuKey: "root",
        menuPageIndex: 0,


        viewMode: viewMode, //"console" || "battle" || "reporting"

        //Arena
        backgroundStyle: null,
        isBattleOver: false,
        showEndingOverlay: true, //false
        isAllowingMusic: true,

        //CodePen demo:
        isShowingIntroScreen: true, //true,

        //Reporting
        isReportRunning: false
    },
    map: {
        viewportWidth: 0
    },
    playerData: {
        ...InitialPlayerData
    }
});

export default store;