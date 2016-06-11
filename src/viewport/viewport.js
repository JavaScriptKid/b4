import React from 'react'
import { connect } from 'react-redux'
import resizer from './resizer'
import BattleConsoleView from '../battle/console-view/console-view'

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
            return <BattleConsoleView />
        }


        const viewportStyle = {
            width: this.props.vpWidth,
            height: this.props.vpHeight
        };
        return (
            <div className="ui-wrapper">
                <div style={viewportStyle} className={`viewport viewport-${this.props.vpWidth}`}>
                    Game Frame
                </div>
            </div>
        );
    }
}

Viewport.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

Viewport.defaultProps = {
}



export default Viewport;