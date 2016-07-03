import React from 'react'
import { connect } from 'react-redux'
import {executeTurn} from '../execute-turn'
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'
import {addQueuedSubmissions} from '../cloud-queue'

import {getSmartAttack} from '../combatants/enemy-ai'

@connect((state, props) => {
    return {
        history: state.battle.history,
        turnRolloutHistoryEntries: state.battle.turnRolloutHistoryEntries,
        devTimeTravelTurn: state.battle.devTimeTravelTurn
    }
})
class TurnControls extends React.Component {

    componentDidMount() {
        //this.runTurn();
    }

    runTurn(count=1) {

        const combs = this.props.history[ this.props.history.length-1 ].combatants;
        const player1Id = Object.keys(combs)[0];
        const player2Id = Object.keys(combs)[1];
        const submissions = [ /* Submission models */
            getSmartAttack(
                combs[player1Id], combs[player2Id], {}
            ),
            getSmartAttack(
                combs[player2Id], combs[player1Id], {}
            )
        ];

        /* RUN A COUNT # OF TURNS TODO - only does 1 right now */
        [1].forEach(i => {
            const result = executeTurn(submissions);
            //FOR NOW
            setBattleValue({
                history: [
                    ...this.props.history,
                    result.nextState
                ],
                turnRolloutHistoryEntries: [
                    ...this.props.turnRolloutHistoryEntries,
                    {
                        turnId: this.props.turnRolloutHistoryEntries.length,
                        steps:result.rolloutSteps
                    }
                ],
                devTimeTravelTurn: this.props.devTimeTravelTurn+1
            })
        });
    }

    handleClick() {
        this.runTurn();
    }

    render() {
        return (
           <div>
               <button onClick={::this.handleClick}>Run Turn</button>
           </div>
        );
    }
}

export default TurnControls;