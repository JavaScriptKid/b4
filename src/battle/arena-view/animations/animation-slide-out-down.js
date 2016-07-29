import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'

class AnimationSlideOutDown extends React.Component {
    componentDidMount() {

        if (this.props.isPlayer) {
            setCombatantValue(this.props.casterId, {
                animation: "slideOutDown 0.8s forwards"
            });
        }

        setTimeout(() => {

            setCombatantValue(this.props.casterId, {
                animation: "inherit"
            });
            setBattleValue({
                currentAnimation: null,
            });

            setTimeout(function() {
                doStep();
            }, 200); /* LEGACY - Pause for a bit when animation ends */

        }, 810);
    }

    render() {
        return <div style={{position:'absolute'}}></div>;
    }
}

AnimationSlideOutDown.defaultProps = {
    casterId: ""
};

export default AnimationSlideOutDown;