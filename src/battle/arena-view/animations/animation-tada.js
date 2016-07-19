import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'

class AnimationTada extends React.Component {
    componentDidMount() {
        setCombatantValue(this.props.casterId, {
            animation: "tada 1s infinite"
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

        }, 1002);
    }

    render() {
        return <div style={{position:'absolute'}}></div>;
    }
}

AnimationTada.defaultProps = {
    casterId: ""
};

export default AnimationTada;