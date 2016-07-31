import React from 'react'
import { connect } from 'react-redux'



class Lifebar extends React.Component {


    getColorStyle(percent) {

        const green = "linear-gradient(-180deg, #23E500 0%, #78EB69 38%, #0FC700 100%)";
        const yellow = "linear-gradient(-180deg, #E5E200 0%, #EBE669 38%, #C7BC00 100%)";
        const red = "linear-gradient(-180deg, #E50000 0%, #EB6969 38%, #C70000 100%)";

        if (percent <= 20) { return red; }
        if (percent <= 50) { return yellow; }
        return green;

    }

    render() {
        const baseUnit = this.props.vW;
        const containerStyle = {
            position: "relative",
            display: "inline-block",
            verticalAlign: "middle",
            borderRadius: baseUnit * 0.3,
            width: baseUnit * 14,
            height: baseUnit * 1.5,
            background: "#333",
            marginRight: baseUnit * 2
        };

        const pad = baseUnit * 0.25;
        const fillContainerStyle = {
            position: "absolute",
            left:pad,
            right:pad,
            top:pad,
            bottom:pad
        };

        const percent = (Math.round( this.props.part / this.props.whole * 100 ));
        const fillStyle = {
            position: "absolute",
            width: `${percent}%`,
            left:0,
            top:0,
            bottom:0,
            background: this.getColorStyle(percent)
        };

        const hpIndicatorStyle = {
            position: "absolute",
            top: "96%",
            left: baseUnit * 0.3,
            padding: baseUnit * 0.3,
            fontSize: baseUnit * 1.4,
            background: "#222",
            color:"#FFF"
        };

        const indicator = this.props.isPlayer ? (
            <div style={hpIndicatorStyle}>
                {this.props.part}/{this.props.whole}
            </div>
        ) : null;


        return (
           <div style={containerStyle}>
               <div style={fillContainerStyle}>
                   <div style={fillStyle} />
               </div>
               {indicator}
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