import store from '../init/store'
import {setBattleValue, setLatestHistory, setCombatantValue} from '../redux-action-creators/battle-action-creators'
import {gradualStateChange, removeAnimationFromState} from './gradual-state-change'
import {turnCombatantsForSubmissions} from './arena-view/turn-combatants'
import {getDeadCombatantId} from './get-dead-combatant-id'
import {getWinningCombatantId} from './get-winning-combatant-id'



export function doStep() {
    const rollout = store.getState().battle.rollout;


    /* Handle acknowleding the battle intro  */
    if (store.getState().battle.isShowingIntroScreen) {
        setBattleValue({
            isShowingIntroScreen: false
        });

        //Face away from each other
        turnCombatantsForSubmissions();
        return;
    }


    /* Rollout queue is empty -> go to end of turn */
    if (rollout.length == 0) {
        handleEndOfTurn();
        return;
    }

    const nowStep = rollout[0];
    //console.log(nowStep);

    //Delete this step
    const reducedRollout = rollout.filter((step,i) => {return i > 0});
    setBattleValue({
        rollout: reducedRollout
    });

    //Do the step.
    if (nowStep.type == "message") {

        setBattleValue({
            textMessageContent: []
        });

        setBattleValue({
            textMessageContent: nowStep.content
        })

    }

    if (nowStep.type == "animation") {

        if (!nowStep.actionDescription) {
            console.warn('no actionDescription found for', nowStep)
        }
        //console.log(nowStep)
        setBattleValue({
            currentAnimation: {
                animationId: nowStep.animationName,
                actionDescription: nowStep.actionDescription
            }
        })
    }

    if (nowStep.type == "stateChange") {
        gradualStateChange(nowStep.newState);
    }

}


var handleEndOfTurn = function() {

    const history = store.getState().battle.history;
    const result = store.getState().battle.result;
    const turnRolloutHistoryEntries = store.getState().battle.turnRolloutHistoryEntries;
    const devTimeTravelTurn = store.getState().battle.devTimeTravelTurn;

    //We are rolled out, so update State and Rollout history with the preserved result
    setBattleValue({
        textMessageContent: [],
        //submissions: [],
        history: [
            ...history,
            removeAnimationFromState(result.nextState)
        ],
        turnRolloutHistoryEntries: [
            ...turnRolloutHistoryEntries,
            {
                turnId: turnRolloutHistoryEntries.length,
                steps:result.rolloutSteps
            }
        ],
        devTimeTravelTurn: devTimeTravelTurn+1
    });


    //Is the battle over?
    if ( getDeadCombatantId(result.nextState) ) {
        //Yes.

        const isBattleOver = store.getState().battle.isBattleOver;

        if (isBattleOver) {
            //"So and So is the winner"
            handleExitBattle()
        } else {
            //"So and So is the winner"
            handleEndOfBattle(result.nextState)
        }

    } else {
        //No.
        setBattleValue({
            submissions: []
        });
        turnCombatantsForSubmissions();
    }

};


var handleEndOfBattle = function(nextState) {

    const winnerId = getWinningCombatantId(nextState);
    const loserId = getDeadCombatantId(nextState);

    const winnerProperties = nextState.combatants[winnerId];

    setBattleValue({
        isBattleOver: true,
        textMessageContent: [
            `${winnerProperties.name} is the winner!`
        ]
    });
    setCombatantValue(winnerId, {
        animation: "celebrate 2s infinite"
    });

};

var handleExitBattle = function() {
        setBattleValue({
            showEndingOverlay: true
        })
};