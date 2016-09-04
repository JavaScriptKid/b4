import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'

class AnimationCommit extends React.Component {
    componentDidMount() {
        setTimeout(() => {

            setCombatantValue(this.props.casterId, {
                animation: "inherit"
            });
            setBattleValue({
                currentAnimation: null
            });

            setTimeout(function() {
                doStep();
            }, 200); /* LEGACY - Pause for a bit when animation ends */

        }, 1002);
    }

    render() {

        const commitStyle = {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom:0,
            zIndex: 99,
            background: "#fff",
            opacity: 0,
            animation: "screenshot 1s forwards"
        };

        return <div style={commitStyle}></div>;
    }
}

AnimationCommit.defaultProps = {
    casterId: ""
};

export default AnimationCommit;