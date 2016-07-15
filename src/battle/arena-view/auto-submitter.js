import React from 'react'
import { connect } from 'react-redux'
import {getAutoAttacks} from '../combatants/enemy-ai'
import {addSubmission} from '../submissions/add-submission'

@connect((state, props) => {
    return {
        submissions: state.battle.submissions,
    }
})

class AutoSubmitter extends React.Component {


    submit(newProps) {
            if (newProps.submissions.length == 0) {
                const autoSubmission = getAutoAttacks(); //Just gets one submission for the computer for now
                addSubmission(autoSubmission)
            }
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