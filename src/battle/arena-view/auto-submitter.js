import React from 'react'
import { connect } from 'react-redux'
import {getAutoAttacks, getSmartAttack} from '../combatants/enemy-ai'
import {addSubmission} from '../submissions/add-submission'

@connect((state, props) => {
    return {
        submissions: state.battle.submissions,
    }
})

class AutoSubmitter extends React.Component {


    submit(newProps) {

        //Presentational Timeout Only for BOTH PLAYERS being computer controlled
        setTimeout(() => {

            if (newProps.submissions.length == 0) {
                const autoSubmission = getAutoAttacks(); //Just gets one submission for the computer for now
                autoSubmission.forEach(submission => {
                    addSubmission(submission)
                });
            }
        }, 700)
    }

    componentDidMount() {
        this.submit(this.props);
    }

    componentWillUpdate(newProps) {
        if (newProps.submissions.length != this.props.submissions.length) {
            this.submit(newProps);
        }
    }

    render() {
        return null
    }
}


export default AutoSubmitter;