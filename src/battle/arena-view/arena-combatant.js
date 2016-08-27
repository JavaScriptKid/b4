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

    getPositionStyles(baseUnit) {

        if (this.props.isPlayer) {
            //Player
            const rolloutLeftValue = baseUnit * 8;
            const submittingLeftValue = baseUnit * 41;

            return {
                left: this.props.isBigMessageBoard ? rolloutLeftValue : submittingLeftValue,
                top: baseUnit * 28,
                width: baseUnit * 29,
                height: baseUnit * 29,
            }
        }

        //Enemy
        return {
            left: baseUnit * 50,
            top: baseUnit * 13,
            width: baseUnit * 20,
            height: baseUnit * 20,
        }
    }

    render() {
        const me = new CombatantModel(this.props.combatant);
        const baseUnit = this.props.vW;


        const style = {
            backgroundImage: `url(${me.skin})`,
            animation: me.animation,
            width: "100%",
            height: "100%",
            //...this.getPositionStyles(baseUnit)
        };

        const playerClass = this.props.isPlayer ? "is-player" : "";
        const containerStyle = {
            position: "absolute",
            ...this.getPositionStyles(baseUnit)
        };


        return (
            <div style={containerStyle} className="single-combatant-container">
                <div style={style} className={`arena-combatant-image ${playerClass}`}>
                </div>
                <div className="arena-combatant-shadow"></div>
            </div>
        );
    }
}

ArenaCombatant.defaultProps = {
    combatantId: "some-id",
    isPlayer: false,
};



export default ArenaCombatant;