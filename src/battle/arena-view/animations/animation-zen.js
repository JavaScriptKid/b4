import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'

class AnimationZen extends React.Component {
    componentDidMount() {
        setCombatantValue(this.props.casterId, {
            animation: "shake 3s infinite"
        });
        setBattleValue({
            backgroundStyle: "rgba(56,202,234,0.5)"
        });

        setTimeout(() => {

            setCombatantValue(this.props.casterId, {
                animation: "inherit"
            });
            setBattleValue({
                currentAnimation: null,
                backgroundStyle: "rgba(0,0,0,0)"
            });

            setTimeout(function() {
                doStep();
            }, 200); /* LEGACY - Pause for a bit when animation ends */

        }, 1202);
    }

    render() {
        return <div style={{position:'absolute'}}></div>;
    }
}

AnimationZen.defaultProps = {
    casterId: ""
};

export default AnimationZen;