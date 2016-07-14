import React from 'react';
import {connect} from 'react-redux';
import {setBattleValue} from '../redux-action-creators/battle-action-creators'

class BattleDevViewSwitcher extends React.Component {

    switchToConsole(e) {
        e.preventDefault();
        setBattleValue({
            viewMode: "console"
        })
    }

    switchToArena(e) {
        e.preventDefault();
        setBattleValue({
            viewMode: "arena"
        })
    }

    render() {
        const isConsoleMode = (this.props.viewMode == "console");
        const activeStyle = {
            background: "#4A90E2",
            color:"#fff",
            borderColor: "#2F619B"
        };

        return (
            <div style={{marginBottom:"1em"}}>
                <a href="#" className="dev-switch-link" onClick={::this.switchToConsole} style={ isConsoleMode ? activeStyle : {}}>Console</a>
                <a href="#" className="dev-switch-link" onClick={::this.switchToArena} style={ !isConsoleMode ? activeStyle : {}}>Arena</a>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        viewMode: state.battle.viewMode
    }
})(BattleDevViewSwitcher)