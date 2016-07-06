import React from 'react'
import { connect } from 'react-redux'
import {executeTurn} from '../execute-turn'
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'
import {addQueuedSubmissions} from '../cloud-queue'

import {getSmartAttack} from '../combatants/enemy-ai'
import Actions from '../../_data/battle-actions'

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


        const actionid1 = this.refs.player1select.value == "random" ? null : this.refs.player1select.value;
        const actionid2 = this.refs.player2select.value == "random" ? null : this.refs.player2select.value;

        const submissions = [ /* Submission models */
            getSmartAttack(
                combs[player1Id], combs[player2Id], {}, actionid1
            ),
            getSmartAttack(
                combs[player2Id], combs[player1Id], {}, actionid2
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

    renderActions(combId) {
        const combs = this.props.history[ this.props.history.length-1 ].combatants;
        const model = combs[combId];

        const options = [
            ...model.attacks,
            ...model.items
        ];

        return options.map((actionId, i) => {

            const model = Actions[actionId];
            const itemLabel = model.type == "Item" ? "ITEM: " : "";

            return <option key={i} value={actionId}>{itemLabel}{model.name}</option>
        });

    }

    render() {

        const combs = this.props.history[ this.props.history.length-1 ].combatants;
        const player1Id = Object.keys(combs)[0];
        const player2Id = Object.keys(combs)[1];

        return (
           <div>
               <button onClick={::this.handleClick}>Run Turn</button>
               <div>
                   <span>
                       C1
                       <select ref="player1select">
                           {this.renderActions(player1Id)}
                       </select>
                   </span>
                   <span>
                       C2
                       <select ref="player2select">
                           {this.renderActions(player2Id)}
                       </select>
                   </span>
               </div>
           </div>
        );
    }
}

export default TurnControls;