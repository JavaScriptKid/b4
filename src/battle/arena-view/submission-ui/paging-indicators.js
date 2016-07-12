import React from 'react'
import { connect } from 'react-redux'
import range from 'lodash/range'

@connect((state, props) => {
    return {
    }
})

class PagingIndicators extends React.Component {

    render() {

        if (this.props.totalItems <= 4) {
            return null
        }

        const baseUnit = this.props.vW;
        const containerStyle = {
            width: baseUnit * 37,
            display: "flex",
            justifyContent: "center",
            paddingTop: baseUnit * 1.5,
            paddingBottom: baseUnit * 1.5,
        };
        const circleStyle = {
            width: baseUnit * 1.3,
            height: baseUnit * 1.3,
            borderRadius: "50%",
            border: `${baseUnit * 0.3}px solid #222`,
            marginLeft: baseUnit * 1,
            marginRight: baseUnit * 1,
        };

        const pages = Math.ceil(this.props.totalItems / 4);
        const circles = range(pages).map((page,i) => {

            const diff = (i+1) * 4 - this.props.currentIndex;
            const isActivePage = (diff >= 0 && diff <= 4);
            const style = {
                ...circleStyle,
                background: isActivePage ? "#000" : "rgba(0,0,0,0)"
            };

            return <div key={i} style={style} />
        });


        return (
           <div style={containerStyle}>
               {circles}
           </div>
        );
    }
}


export default PagingIndicators;