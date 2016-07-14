import React from 'react';
import {connect} from 'react-redux';
import {setBattleValue} from '../redux-action-creators/battle-action-creators'

class BattleDevViewSwitcher extends React.Component {

    switchToConsole() {
        setBattleValue({
            viewMode: "console"
        })
    }

    switchToArena() {
        setBattleValue({
            viewMode: "arena"
        })
    }

    render() {
        const isConsoleMode = (this.props.viewMode == "console");
        const activeStyle = {
            fontWeight: "bold"
        };

        return (
            <div style={{position:"absolute"}}>
                <a href="#" onClick={::this.switchToConsole} style={ isConsoleMode ? activeStyle : {}}>Console</a>
                <a href="#" onClick={::this.switchToArena} style={ !isConsoleMode ? activeStyle : {}}>Arena</a>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        viewMode: state.battle.viewMode
    }
})(BattleDevViewSwitcher)