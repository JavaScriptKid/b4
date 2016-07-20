import React from 'react'
import { connect } from 'react-redux'



class Lifebar extends React.Component {

    render() {
        const baseUnit = this.props.vW;
        const containerStyle = {
            position: "relative",
            display: "inline-block",
            borderRadius: baseUnit * 0.3,
            width: baseUnit * 14,
            height: baseUnit * 1.5,
            background: "#000"
        };

        const pad = baseUnit * 0.25;
        const fillStyle = {
            position: "absolute",
            left:pad,
            right:pad,
            top:pad,
            bottom:pad,
            background: "linear-gradient(-180deg, #50E3C2 46%, #88F3E2 71%, #30E2D3 100%)"
        };

        return (
           <div style={containerStyle}>
               <div style={fillStyle} />
           </div>
        );
    }
}



Lifebar.defaultProps = {
    part: 0,
    whole: 0,
    vW: 0
};



export default Lifebar;