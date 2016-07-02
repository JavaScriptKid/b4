import React from 'react'
import { connect } from 'react-redux'

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
            return "[Animation]"
        }
    }

    render() {
        const stepLogs = this.props.model.map((step,i) => {
            console.log(step);

            const typeClass = step.type == "message" ? "" : "battle-turn-sub-event"

            return (
                <div key={i} className={`battle-log-line ${typeClass}`}>
                    {this.getText(step)}
                </div>
            )
        });

        return (
            <div>
                <a href="#" className="battle-revert-link">Revert to here (#{this.props.turnId})</a>
                <div className="battle-turn">
                    {stepLogs}
                </div>
            </div>
        )

        //return (
        //    <div>
        //        <a href="#" className="battle-revert-link">Revert to here (#{this.props.turnId})</a>
        //        <div className="battle-turn">
        //            <div className="battle-log-line battle-turn-message">
        //                "Jacob used Slice"
        //            </div>
        //            <div className="battle-log-line battle-turn-sub-event">
        //                [ Animation ]
        //            </div>
        //            <div className="battle-log-line battle-turn-sub-event">
        //                [ Allan HP: 40 (-20) ]
        //            </div>
        //            <div className="battle-turn-message">
        //                "Drew used forEach"
        //            </div>
        //            <div className="battle-log-line battle-turn-sub-event">
        //                [ Jacob HP: 20 (-20) ]
        //            </div>
        //        </div>
        //    </div>
        //);
    }
}

export default ConsoleListTurn;