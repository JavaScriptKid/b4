import React from 'react'
import { connect } from 'react-redux'
import {CombatantModel} from '../combatant-model'

@connect((state, props) => {
    return {
        combatant: state.battle.history[state.battle.devTimeTravelTurn].combatants[props.combatantId],
        vW: Math.round(state.map.viewportWidth / 100)
    }
})

class ArenaCombatant extends React.Component {

    render() {
        const me = new CombatantModel(this.props.combatant);
        const baseUnit = this.props.vW;


        const style = {
            width: baseUnit * 20,
            height: baseUnit * 20,
            backgroundImage: `url(${me.skin})`
        };

        const playerClass = this.props.isPlayer ? "is-player" : "";

        return (
           <div style={style} className={`arena-combatant ${playerClass}`}>
           </div>
        );
    }
}

ArenaCombatant.defaultProps = {
    combatantId: "some-id",
    isPlayer: false
};



export default ArenaCombatant;