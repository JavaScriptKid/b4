import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class CombatantUpgradeList extends React.Component {

    render() {
        return (
           <div>
               List of Upgrades ({this.props.combatantId})
           </div>
        );
    }
}

export default CombatantUpgradeList;