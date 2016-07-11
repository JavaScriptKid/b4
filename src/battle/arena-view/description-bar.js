import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        vW: Math.round(state.map.viewportWidth / 100),
        descriptionBarText: state.battle.descriptionBarText
    }
})

class DescriptionBar extends React.Component {

    render() {
        const baseUnit = this.props.vW;

        const barStyle = {
            padding: baseUnit,
            paddingLeft: baseUnit * 3,
            borderTop: `${baseUnit * 0.5}px solid #000`,
            borderBottom: `${baseUnit * 0.5}px solid #000`,
            fontSize: baseUnit * 2,
            height: baseUnit * 5
        };

        return (
           <div style={barStyle} className="bottom-bar">
               {this.props.descriptionBarText}
           </div>
        );
    }
}

export default DescriptionBar;