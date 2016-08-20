import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        isActive: false
    }
})

class EndingOverlay extends React.Component {

    
    render() {

        const activeClass = this.props.isActive ? "is-active" : "";

        return (
           <div className={`ending-overlay ${activeClass}`}>

           </div>
        );
    }
}



export default EndingOverlay;