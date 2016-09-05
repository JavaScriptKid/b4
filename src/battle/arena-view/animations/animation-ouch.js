import React from 'react'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'

class AnimationOuch extends React.Component {
    componentDidMount() {
        setCombatantValue(this.props.casterId, {
            animation: "celebrate 0.7s forwards" //"ouch" = celebrate but faster
        });

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

        }, 702);
    }

    render() {
        return <div style={{position:'absolute'}}></div>;
    }
}

AnimationOuch.defaultProps = {
    casterId: ""
};

export default AnimationOuch;