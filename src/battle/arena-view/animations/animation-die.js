import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'

class AnimationDie extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            /* Delay to let the Damage blinking stop */
            setCombatantValue(this.props.casterId, {
                animation: "die 1s ease-out forwards"
            });

        }, 200);

        setTimeout(() => {

            setBattleValue({
                currentAnimation: null
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

AnimationDie.defaultProps = {
    casterId: ""
};

export default AnimationDie;