import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue} from './redux-action-creators/battle-action-creators'

@connect((state, props) => {
    return {
        isAllowingMusic: state.battle.isAllowingMusic //state["game"] in the real project
    }
})

export default class AudioOption extends React.Component {

    handleSwitch(e) {
        e.preventDefault();
        const newValue = !this.props.isAllowingMusic;

        setBattleValue({
            isAllowingMusic: newValue
        });


        /* Interact with music player. This is the only interaction with Howler for this feature */
        if (newValue == true) {
            Howler.mute(false);

            this.refs.link.blur();
            return;
        }

        Howler.mute(true);
        this.refs.link.blur();
    }

    render() {

        return (
            <div style={{padding: "1em"}}>
                MUSIC:
                <a ref="link" href="#" onClick={::this.handleSwitch}>
                    {this.props.isAllowingMusic ? "ON" : "OFF"}
                </a>
            </div>
        );
    }
}