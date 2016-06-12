import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class CharacterUpgradeChecklist extends React.Component {

    render() {
        return (
           <div>
               <div>Upgrade 1: <input type="checkbox" /></div>
               <div>Upgrade 2: <input type="checkbox" /></div>
               <div>Upgrade 3: <input type="checkbox" /></div>
               <div>Upgrade 4: <input type="checkbox" /></div>
           </div>
        );
    }
}

export default CharacterUpgradeChecklist;