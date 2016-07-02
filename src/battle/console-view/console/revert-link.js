import React from 'react'
import { connect } from 'react-redux'
import {setBattleValue} from '../../../redux-action-creators/battle-action-creators'

@connect((state, props) => {
    return {
        history: state.battle.history,
        turnRolloutHistoryEntries: state.battle.turnRolloutHistoryEntries,
        devTimeTravelTurn: state.battle.devTimeTravelTurn
    }
})

class RevertLink extends React.Component {

    handleClick(e) {
        e.preventDefault();


        setBattleValue({
            history: this.props.history.filter((h,i) => { return i <= this.props.turnId }),
            turnRolloutHistoryEntries: this.props.turnRolloutHistoryEntries.filter((h,i) => { return i <= this.props.turnId }),
            devTimeTravelTurn: this.props.turnId
        });

    }

    render() {

        /* Already on this point in history, hide the revert option because it won't do anything */
        if (this.props.devTimeTravelTurn == this.props.turnId) {
            return null;
        }

        return (
            <a href="#" onClick={::this.handleClick} className="battle-revert-link">Revert to here (#{this.props.turnId})</a>
        );
    }
}


export default RevertLink;