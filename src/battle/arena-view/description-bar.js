import React from 'react'
import { connect } from 'react-redux'


//DEV ONLY
import {setBattleValue} from '../../redux-action-creators/battle-action-creators'
import store from '../../init/store'


@connect((state, props) => {
    return {
        vW: Math.round(state.map.viewportWidth / 100),
        descriptionBarText: state.battle.descriptionBarText
    }
})

class DescriptionBar extends React.Component {

    handleDevClick() {
        setBattleValue({
            submissions: store.getState().battle.submissions.length > 0 ? [] : ["a", "b"]
        });
    }

    render() {
        const baseUnit = this.props.vW;

        const barStyle = {
            padding: baseUnit,
            paddingLeft: baseUnit * 3,
            borderTop: `${baseUnit * 0.5}px solid #000`,
            borderBottom: `${baseUnit * 0.5}px solid #000`,
            fontSize: baseUnit * 2,
            height: baseUnit * 5
        };

        return (
           <div onClick={::this.handleDevClick} style={barStyle} className="bottom-bar">
               {this.props.descriptionBarText}
           </div>
        );
    }
}

export default DescriptionBar;