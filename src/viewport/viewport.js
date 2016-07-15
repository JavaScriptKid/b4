import React from 'react'
import { connect } from 'react-redux'
import resizer from './resizer'
import BattleConsoleView from '../battle/console-view/console-view'
import BattleArenaView from '../battle/arena-view/arena-view'

@connect((state, props) => {
    return {
        isBattleConsoleView: state.battle.viewMode == "console", //and gameArea == "battle"
        vpWidth: state.map.viewportWidth,
        vpHeight: state.map.viewportHeight,
    }
})

class Viewport extends React.Component {

    componentDidMount() {
        resizer();
    }

    render() {

        if (this.props.isBattleConsoleView) {
            return (
                <div>
                    <BattleConsoleView />
                </div>
            )
        }


        const viewportStyle = {
            width: this.props.vpWidth,
            height: this.props.vpHeight
        };
        return (
            <div className="ui-wrapper">
                <div style={viewportStyle} className={`viewport viewport-${this.props.vpWidth}`}>
                    <BattleArenaView />
                </div>
            </div>
        );
    }
}


export default Viewport;