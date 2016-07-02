import React from 'react'
import { connect } from 'react-redux'


import {executeTurn} from '../execute-turn'
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'


@connect((state, props) => {
    return {
        history: state.battle.history,
        turnRolloutHistoryEntries: state.battle.turnRolloutHistoryEntries,
    }
})
class TurnControls extends React.Component {

    componentDidMount() {
        this.runTurn();
    }

    runTurn(count=1) {

        const combs = this.props.history[ this.props.history.length-1 ].combatants;
        const player1Id = Object.keys(combs)[0];
        const player2Id = Object.keys(combs)[1];
        const submissions = [ /* Submission models */
            {
                casterId: player1Id,
                targetId: player2Id,
                actionId: "attack-001-a",
                speedRoll: 3
            },
            {
                casterId: player2Id,
                targetId: player1Id,
                actionId: "attack-002-a",
                speedRoll: 99
            }
        ];

        /* RUN A COUNT # OF TURNS TODO - only does 1 right now */
        [1].forEach(i => {
            const result = executeTurn(submissions);
            console.log(result);
            //FOR NOW
            setBattleValue({
                history: [
                    ...this.props.history,
                    result.nextState
                ],
                turnRolloutHistoryEntries: [
                    ...this.props.turnRolloutHistoryEntries,
                    result.rolloutSteps
                ]
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