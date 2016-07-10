import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        combatant: state.battle.history[state.battle.devTimeTravelTurn].combatants[props.combatantId],
        vW: Math.round(state.map.viewportWidth / 100)
    }
})

class CombatantScoreboard extends React.Component {

    renderStatusBlip(me) {
        //TODO
        if (me.status == "normal") {
            return null;
        }

        const baseBadgeStyle = {
            color: "#fff",
            background: "red",
            paddingLeft: '0.2em',
            paddingRight: '0.2em'
        };

        if (me.status == "lag") {
            const style = {
                ...baseBadgeStyle,
                background: "#472C5F"
            };
            return <span style={style}>LAGGING</span>
        }

        if (me.status == "zen") {
            const style = {
                ...baseBadgeStyle,
                background: "#4A90E2"
            };
            return <span style={style}>ZEN</span>
        }

        if (me.status == "fury") {
            const style = {
                ...baseBadgeStyle,
                background: "#B72C2C"
            };
            return <span style={style}>FURY</span>
        }

        if (me.status == "memory-leak") {
            const style = {
                ...baseBadgeStyle,
                background: "#FF5303"
            };
            return <span style={style}>MEMORYLEAK</span>
        }

        if (me.status == "fire") {
            const style = {
                ...baseBadgeStyle,
                background: "red"
            };
            return <span style={style}>FIRE</span>
        }


        return null;
    }

    renderHp(me) {
        //HP Color logic here
        return (
            <span className="scoreboard_hp">
                <span>HP</span>
                <span>{me.hp}/{me.maxHp}</span>
            </span>
        )
    }

    renderDanger(me) {
        //Danger Color logic here
        return (
            <span className="scoreboard_danger">
                <span>Danger Meter</span>
                <span>{me.dangerMeter/me.maxDangerMeter * 100}%</span>
            </span>
        )
    }

    renderAlignment(me) {
        const style = {
            top: this.props.vW * 1.5,
            right: this.props.vW * 1.5
        };
        return (
            <div style={style} className="scoreboard_alignment">
                {
                    ["framework_001","framework_002","framework_003","framework_004"].map(frId => {
                       return (
                           <div key={frId} className="square"></div>
                       )
                    })
                }
            </div>
        )
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
                            <span className="scoreboard_name">{(me.name).toUpperCase()}</span>
                            <span className="scoreboard_lvl">
                                <span>LVL</span>
                                <span>{me.level}</span>
                            </span>
                            <span>
                                {this.renderStatusBlip(me)}
                            </span>
                        </div>
                        <div>
                            {this.renderHp(me)}
                            {this.renderDanger(me)}
                        </div>
                        {this.renderAlignment(me)}
                    </div>
           </div>
        );
    }
}

export default CombatantScoreboard;