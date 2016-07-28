import React from 'react';
import {connect} from 'react-redux';
import {setBattleValue} from '../redux-action-creators/battle-action-creators'

class BattleDevViewSwitcher extends React.Component {

    switchToConsole(e) {
        e.preventDefault();

        if (this.props.isRollout) {
            return false;
        }

        setBattleValue({
            viewMode: "console"
        })
    }

    switchToArena(e) {
        e.preventDefault();

        if (this.props.isRollout) {
            return false;
        }

        setBattleValue({
            viewMode: "arena"
        })
    }

    switchToReporting(e) {
        e.preventDefault();

        setBattleValue({
            viewMode: "reporting"
        })
    }

    render() {
        const isConsoleMode = (this.props.viewMode == "console");
        const activeStyle = {
            background: "#4A90E2",
            color:"#fff",
            borderColor: "#2F619B"
        };
        const containerStyle = {
            opacity: this.props.isRollout ? "0.5" : "1",
            marginBottom: "1em"
        };

        return (
            <div style={containerStyle}>
                <a href="#" className="dev-switch-link" onClick={::this.switchToConsole} style={ this.props.viewMode == "console" ? activeStyle : {}}>Console</a>
                <a href="#" className="dev-switch-link" onClick={::this.switchToArena} style={ this.props.viewMode == "arena" ? activeStyle : {}}>Arena</a>
                <a href="#" className="dev-switch-link" onClick={::this.switchToReporting} style={ this.props.viewMode == "reporting" ? activeStyle : {}}>Reporting</a>
            </div>
        )
    }
}

export default connect((state, props) => {
    const combatantIds = Object.keys(state.battle.history[state.battle.devTimeTravelTurn].combatants);

    return {
        viewMode: state.battle.viewMode,
        isRollout: state.battle.submissions.length == combatantIds.length
    }
})(BattleDevViewSwitcher)