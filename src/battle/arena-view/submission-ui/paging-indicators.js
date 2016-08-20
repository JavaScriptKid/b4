import React from 'react'
import { connect } from 'react-redux'
import range from 'lodash/range'

@connect((state, props) => {
    return {
        isHidden: state.battle.menuKey == "root"
    }
})

class PagingIndicators extends React.Component {

    render() {

        if (this.props.isHidden) {
            return null;
        }

        let isVisible = true;
        if (this.props.totalItems == 1) {
            isVisible = false;
        }

        const baseUnit = this.props.vW;
        const containerStyle = {
            width: baseUnit * 37,
            display: "flex",
            justifyContent: "center",
            paddingTop: baseUnit * 1.3,
            paddingBottom: 0,
            visibility: isVisible ? "visible" : "hidden"
        };
        const circleStyle = {
            width: baseUnit * 1.3,
            height: baseUnit * 1.3,
            borderRadius: "50%",
            border: `${baseUnit * 0.3}px solid #222`,
            marginLeft: baseUnit * 1,
            marginRight: baseUnit * 1,
        };


        const circles = range(this.props.totalItems).map((page,i) => {


            const isActivePage = (this.props.currentIndex == i);
            const style = {
                ...circleStyle,
                background: isActivePage ? "#000" : "rgba(0,0,0,0)"
            };

            return <div key={i} style={style}></div>
        });


        return (
           <div style={containerStyle}>
               {circles}
           </div>
        );
    }
}


export default PagingIndicators;