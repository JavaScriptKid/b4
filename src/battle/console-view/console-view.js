import React from 'react'
import { connect } from 'react-redux'
import CombatantCard from './combatant-card'

@connect((state, props) => {
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
                    <div className="col1">
                        {combatantCards}
                    </div>
                    <div className="col2">
                        <div className="card">
                            <a href="#" className="battle-revert-link">Revert to here</a>
                            <div className="battle-turn">
                                <div className="battle-log-line battle-turn-message">
                                    "Jacob used Slice"
                                </div>
                                <div className="battle-log-line battle-turn-sub-event">
                                    [ Animation ]
                                </div>
                                <div className="battle-log-line battle-turn-sub-event">
                                    [ Allan HP: 40 (-20) ]
                                </div>
                                <div className="battle-turn-message">
                                    "Jacob used Slice"
                                </div>
                            </div>
                            <a href="#" className="battle-revert-link">Revert to here</a>
                            <div className="battle-turn">
                                <div className="battle-log-line battle-turn-message">
                                    "Jacob used Sasdasdlice"
                                </div>
                                <div className="battle-log-line battle-turn-sub-event">
                                    [ Animation ]
                                </div>
                                <div className="battle-log-line battle-turn-sub-event">
                                    [ Allan HP: 40 (-20) ]
                                </div>
                                <div className="battle-turn-message">
                                    "Jacob used Slice"
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default ConsoleView;