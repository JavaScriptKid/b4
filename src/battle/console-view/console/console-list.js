import React from 'react'
import { connect } from 'react-redux'
import ConsoleListTurn from './console-list-turn'


@connect((state, props) => {
    return {
        turnRolloutHistoryEntries: state.battle.turnRolloutHistoryEntries
    }
})
class ConsoleList extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.turnRolloutHistoryEntries.map((entry, i) => {
                        return <ConsoleListTurn key={i} turnId={i} model={entry} />
                    }).reverse()
                }
            </div>
        )
    }
}

export default ConsoleList;