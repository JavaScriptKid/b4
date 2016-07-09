import React from 'react'
import { connect } from 'react-redux'
import {executeTurn} from '../execute-turn'
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'
import {addQueuedSubmissions} from '../cloud-queue'
import { CombatantModel } from '../combatant-model'

import {getSmartAttack} from '../combatants/enemy-ai'
import Actions from '../../_data/battle-actions'
import Frameworks from '../../_data/_frameworks'


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


        const actionid1 = this.refs[`${player1Id}-select`].value;
        const actionid2 = this.refs[`${player2Id}-select`].value;


        const p1FrameworkCharge = this.refs[`${player1Id}-dangercheckbox`].checked
            ? this.refs[`${player1Id}-framework`].value || null
            : null;


        const p2FrameworkCharge = this.refs[`${player2Id}-dangercheckbox`].checked
            ? this.refs[`${player2Id}-framework`].value || null
            : null;

        const submissions = [ /* Submission models */
            getSmartAttack(combs[player1Id], combs[player2Id], {}, actionid1, p1FrameworkCharge),
            getSmartAttack(combs[player2Id], combs[player1Id], {}, actionid2, p2FrameworkCharge)
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

    renderActions(model) {
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


    renderCombForm(combId) {
        const combs = this.props.history[ this.props.history.length-1 ].combatants;
        const model = new CombatantModel(combs[combId]);


        const isCheckboxEnabled = model.isDangerMeterUsable();

        const frameworkOptions = model.getAvailableFrameworkOptions().map(optionId => {
            const model = Frameworks[optionId];
            return (
                <option key={optionId} value={optionId}>{model.name}</option>
            )
        });

        return (
            <div>
                <span>{model.name} </span>
                <select ref={`${combId}-select`}>
                    {this.renderActions(model)}
                </select>
                <span>
                    <input ref={`${combId}-dangercheckbox`} type="checkbox" disabled={!isCheckboxEnabled} />
                    Danger Charge
                </span>
                <span>
                    <select ref={`${combId}-framework`} disabled={!isCheckboxEnabled}>
                        {frameworkOptions}
                    </select>
                </span>
            </div>
        )
    }



    render() {

        const combs = this.props.history[ this.props.history.length-1 ].combatants;
        const player1Id = Object.keys(combs)[0];
        const player2Id = Object.keys(combs)[1];

        return (
           <div>
               <button onClick={::this.handleClick}>Run Turn</button>
               <div>
                   {this.renderCombForm(player1Id)}
                   {this.renderCombForm(player2Id)}
               </div>
           </div>
        );
    }
}

export default TurnControls;