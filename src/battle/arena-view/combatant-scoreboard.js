import React from 'react'
import { connect } from 'react-redux'
import {CombatantModel} from '../combatant-model'
import Lifebar from './combatant-lifebar'

@connect((state, props) => {
    return {
        combatant: state.battle.history[state.battle.devTimeTravelTurn].combatants[props.combatantId],
        vW: Math.round(state.map.viewportWidth / 100)
    }
})

class CombatantScoreboard extends React.Component {

    renderStatusBlip(me) {
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

        if (me.status == "deadline") {
            const style = {
                ...baseBadgeStyle,
                background: "#000"
            };
            return <span style={style}>DEADLINE</span>
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

    //renderHp(me) {
    //    //HP Color logic here
    //    return (
    //        <span className="scoreboard_hp">
    //            <span>HP</span>
    //            <span>{me.hp}/{me.maxHp}</span>
    //        </span>
    //    )
    //}

    renderDanger(me) {
        //Danger Color logic here
        const baseUnit = this.props.vW;

        const dangerStyle = {
            fontSize: baseUnit * 1.6,
            verticalAlign: "middle",
            display: "inline-block"
        };

        const style = {
            color: me.isDangerMeterUsable() ? "#399988" : "#444" //TODO: make flashing instead?
        };

        return (
            <span style={dangerStyle} className="scoreboard_danger">
                <span>Danger Meter</span>
                <span style={style}>{me.dangerMeter/me.maxDangerMeter * 100}%</span>
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
                    [
                        {hasValue: me.f1Alignment > 0, fillColor: "#41CA2A"},
                        {hasValue: me.f2Alignment > 0, fillColor: "#8E5FD4"},
                        {hasValue: me.f3Alignment > 0, fillColor: "#4A90E2"},
                        {hasValue: me.f4Alignment > 0, fillColor: "#FF4800"},

                    ].map((obj, i) => {
                        var style = {};
                        if (obj.hasValue) {
                            style.background = me.isDangerMeterUsable() ? obj.fillColor : "#444";
                        }
                        return (
                            <div key={i} style={style} className="square"></div>
                        )
                    })
                }
            </div>
        )
    }

    render() {

        const me = new CombatantModel(this.props.combatant);
        const baseUnit = this.props.vW;

        const scoreboardStyle = {
            width: `calc(50% - ${baseUnit * 0.5 }px)`,
            border: `${baseUnit * 0.5 }px solid #000`,
            //borderRadius: `${baseUnit * 0.5 }`,
            padding: baseUnit * 1,
            fontSize: baseUnit * 2 /* BASE FONT SIZE */
        };
        const avatarStyle = {
            width: baseUnit * 5,
            height: baseUnit * 5,
            marginRight: baseUnit,
            backgroundImage: `url(${me.skin})`,
        };



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
                            <Lifebar part={me.hp} whole={me.maxHp} vW={baseUnit}/>
                            {this.renderDanger(me)}
                        </div>
                        {this.renderAlignment(me)}
                    </div>
           </div>
        );
    }
}

export default CombatantScoreboard;