import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'
import {sfxIterate} from '../../../_data/_sfx'


class AnimationIterate extends React.Component {
    componentDidMount() {


        var repetitions = this.props.repetitionsCount;

        var self = this;
        function doIteration() {
            sfxIterate.play();
            repetitions -= 1;

            setCombatantValue(self.props.casterId, {
                animation: "tada 0.5s infinite"
            });

            setTimeout(() => {
                setCombatantValue(self.props.casterId, {
                    animation: "inherit"
                });
                setBattleValue({
                    currentAnimation: null
                });

                if (repetitions > 0) {
                    doIteration()
                } else {
                    doStep();
                }

            }, 502);
        }

        doIteration();

    }

    render() {
        return <div style={{position:'absolute'}}></div>;
    }
}

AnimationIterate.defaultProps = {
    casterId: ""
};

export default AnimationIterate;