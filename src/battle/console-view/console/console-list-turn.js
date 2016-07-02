import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class ConsoleListTurn extends React.Component {

    render() {
        return (
            <div>
                <a href="#" className="battle-revert-link">Revert to here (#{this.props.turnId})</a>
                <div className="battle-turn">
                    <div className="battle-log-line battle-turn-message">
                        "Jacob used Slice"
                    </div>
                    <div className="battle-log-line battle-turn-sub-event">
                        [ Animation ]
                    </div>
                    <div className="battle-log-line battle-turn-sub-event">
                        [ Allan HP: 40 (-20) ]
                    </div>
                    <div className="battle-turn-message">
                        "Drew used forEach"
                    </div>
                    <div className="battle-log-line battle-turn-sub-event">
                        [ Jacob HP: 20 (-20) ]
                    </div>
                </div>
            </div>
        );
    }
}

export default ConsoleListTurn;