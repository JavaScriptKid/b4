import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'

class AnimationSlice extends React.Component {

    componentDidMount() {
        // setCombatantValue(this.props.casterId, {
        //     animation: "shake 0.5s infinite"
        // });

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

        }, 302);
    }

    render() {

        const {isPlayer} = this.props;

        const sliceStyle = {
            position: "absolute",
            left: isPlayer ? "47%" : "10%",
            top: isPlayer ? "10%" : "40%",
            width: "26%",
            paddingBottom: "26%",
            opacity: "0.7",
            zIndex: 10,
            backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/slice.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1000%",
            backgroundPosition: "100% 0",
            animation: "slice 0.3s steps(9)"
        };

        return (
            <div style={sliceStyle}>

            </div>
        );
    }
}

AnimationSlice.defaultProps = {
    casterId: "",
    isPlayer: true
};

export default AnimationSlice;