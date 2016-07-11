import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        vW: Math.round(state.map.viewportWidth / 100)
    }
})

class SubmissionMenu extends React.Component {

    render() {
        const baseUnit = this.props.vW;
        const menuStyle = {
            left: this.props.hide ? (baseUnit * - 37) : (baseUnit * 4),
            bottom: baseUnit * 7,
            fontSize: baseUnit * 3
        };
        const optionStyle = {
            padding: baseUnit * 1.5,
            width: baseUnit * 31,
            border: `${baseUnit * 0.5 }px solid #000`,
            borderRadius: `${baseUnit * 0.5 }`,
            marginTop: baseUnit * 1.5
        };


        return (
           <div style={menuStyle} className="submission-menu">
               <div style={optionStyle} className="submission-menu_option">
                   <span>Attack</span>
                   <span>...</span>
               </div>
               <div style={optionStyle} className="submission-menu_option">
                   <span>Special</span>
                   <span>...</span>
               </div>
               <div style={optionStyle} className="submission-menu_option">
                   <span>Item</span>
                   <span>...</span>
               </div>
           </div>
        );
    }
}

export default SubmissionMenu;