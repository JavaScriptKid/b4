import React from 'react'
import { connect } from 'react-redux'
import RevertLink from './revert-link'

@connect((state, props) => {
    return {
    }
})

class ConsoleListTurn extends React.Component {


    getText(step) {

        if (step.type == "message") {
            return step.content.filter(str => {return !str.match(/^@@/)}).join("").replace(/\[FAST\]/g, "");
        }
        if (step.type == "animation") {
            return `[Animation: ${step.animationName}]`
        }
        if (step.type == "stateChange") {
            return `___{State Change}___`
        }
    }

    render() {




        const stepLogs = this.props.model.steps.map((step,i) => {

            const typeClass = step.type == "message" ? "" : "battle-turn-sub-event"

            return (
                <div key={i} className={`battle-log-line ${typeClass}`}>
                    {this.getText(step)}
                </div>
            )
        });

        return (
            <div>
                <RevertLink turnId={this.props.model.turnId} />
                <div className="battle-turn">
                    {(this.props.model.turnId == 0) ? "INIT" : stepLogs}
                </div>
            </div>
        )
    }
}

export default ConsoleListTurn;