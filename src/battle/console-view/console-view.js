import React from 'react'
import { connect } from 'react-redux'
import CombatantCard from './combatant-card'
import TurnControls from './turn-controls'
import ConsoleList from './console/console-list'

@connect((state, props) => {

    console.log(state.battle.devTimeTravelTurn);
    console.log(state.battle.history);

    return {
        combatantIds: Object.keys(state.battle.history[state.battle.devTimeTravelTurn].combatants)
    }
})

class ConsoleView extends React.Component {

    render() {

        const combatantCards = this.props.combatantIds.map(cId => {
            return (
                <CombatantCard key={cId} combatantId={cId} />
            )
        });

        return (
            <div style={{background:"#E0E5EE", padding:"1em", height:"100%"}}>
            <div className="b4">
                <div className="wrap">
                    <TurnControls />
                </div>
                <div className="wrap">
                    <div className="col1">
                        {combatantCards}
                    </div>
                    <div className="col2">
                        <div className="card">
                            <ConsoleList />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default ConsoleView;