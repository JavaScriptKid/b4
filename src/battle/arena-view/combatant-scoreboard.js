import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        combatant: state.battle.history[state.battle.devTimeTravelTurn].combatants[props.combatantId],
        vW: Math.round(state.map.viewportWidth / 100)
    }
})

class CombatantScoreboard extends React.Component {

    renderStatusBlip() {
        //TODO
        return null;
    }

    render() {

        const baseUnit = this.props.vW;

        const scoreboardStyle = {
            width: `calc(50% - ${baseUnit * 0.5 }px)`,
            border: `${baseUnit * 0.5 }px solid #000`,
            padding: baseUnit * 1,
            fontSize: baseUnit * 2 /* BASE FONT SIZE */
        };
        const avatarStyle = {
            width: baseUnit * 5,
            height: baseUnit * 5,
            marginRight: baseUnit
        };

        const me = this.props.combatant;

        return (
           <div className="scoreboard" style={scoreboardStyle}>
                    <div className="scoreboard_avatar-container">
                        <div style={avatarStyle} className="scoreboard_avatar">
                        </div>
                    </div>
                    <div className="scoreboard_scores">
                        <div>
                            <span>{(me.name).toUpperCase()}</span>
                            <span>
                                <span>LVL</span>
                                <span>{me.level}</span>
                            </span>
                            <span>
                                {this.renderStatusBlip()}
                            </span>
                        </div>
                        <div>
                            <span>
                                <span>HP</span>
                                <span>XX/XX</span>
                            </span>
                            <span>
                                <span>Danger</span>
                                <span>XX%</span>
                            </span>
                        </div>
                    </div>
           </div>
        );
    }
}

export default CombatantScoreboard;