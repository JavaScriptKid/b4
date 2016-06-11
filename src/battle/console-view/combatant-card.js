import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class CombatantCard extends React.Component {

    render() {
        return (
            <div className="card combatant-card">
                <div>
                    <div className="combatant-image"></div>
                </div>
                <div>Info</div>
            </div>
        );
    }
}


export default CombatantCard;