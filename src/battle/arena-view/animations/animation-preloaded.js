import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'

class AnimationPreloaded extends React.Component {
    componentDidMount() {
        setCombatantValue(this.props.casterId, {
            animation: "preloaded 1s forwards" //dead space at end //TODO: trim deadspace off animation so it ends when expected
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

        }, 802);
    }

    render() {
        return <div style={{position:'absolute'}}></div>;
    }
}

AnimationPreloaded.defaultProps = {
    casterId: ""
};

export default AnimationPreloaded;