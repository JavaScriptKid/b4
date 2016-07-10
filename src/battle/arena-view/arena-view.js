import React from 'react'
import { connect } from 'react-redux'
import CombatantScoreboard from './combatant-scoreboard'

@connect((state, props) => {
    return {
        combatantIds: Object.keys(state.battle.history[state.battle.devTimeTravelTurn].combatants),
        vW: Math.round(state.map.viewportWidth / 100)
    }
})

class BattleArenaView extends React.Component {

    render() {

        const scoreboardContainerStyle = {
            padding: this.props.vW * 1
        };

        return (
           <div className="battle-arena">
               <div style={scoreboardContainerStyle} className="scoreboards">
                   <CombatantScoreboard combatantId={this.props.combatantIds[0]} />
                   <CombatantScoreboard combatantId={this.props.combatantIds[1]} />
               </div>
           </div>
        );
    }
}

BattleArenaView.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

BattleArenaView.defaultProps = {
}



export default BattleArenaView;