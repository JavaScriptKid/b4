import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue, setCombatantValue} from '../../../redux-action-creators/battle-action-creators'
import {doStep} from '../../do-step'

class AnimationDDoS extends React.Component {

    componentDidMount() {

        setCombatantValue(this.props.targetId, {
            animation: "celebrate 0.3s infinite" //"ouch"
        });

        setBattleValue({
            backgroundStyle: "rgba(71, 44, 95, 0.6)"
        });

        setTimeout(() => {

            setCombatantValue(this.props.targetId, {
                animation: "inherit"
            });
            setBattleValue({
                currentAnimation: null,
                backgroundStyle: "rgba(0,0,0,0)"
            });

            setTimeout(function() {
                doStep();
            }, 200); /* LEGACY - Pause for a bit when animation ends */

        }, 1602);
    }

    render() {

        const {isPlayer} = this.props;

        const flashBoxStyle = {
            position: "absolute",
            left: isPlayer ? "52%" : "14%",
            top: isPlayer ? "23%" : "45%",
            width: "18%",
            paddingBottom: "18%",
            opacity: "0",
            background: "#ffee52",
            zIndex: 10,
            animation: "flashbox 0.2s infinite steps(2)"
        };

        return (
            <div style={flashBoxStyle}>

            </div>
        );
    }
}

AnimationDDoS.defaultProps = {
    casterId: "",
    isPlayer: true
};

export default AnimationDDoS;