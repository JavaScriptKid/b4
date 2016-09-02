import React from 'react';

class Laptop extends React.Component {
    render() {

        const {vW, isPlayer, extraStyle} = this.props;

        const src = isPlayer
            ? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/laptop-screen-view.svg"
            : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/laptop-back-view.svg";

        const style = {
            zIndex: isPlayer ? 1 : 5,
            position: "absolute",
            left: isPlayer ? 17 * vW : 4 * vW,
            top: isPlayer ? 10 * vW : 12 * vW,
            width: isPlayer ? 14 * vW : 9 * vW,
            ...extraStyle
        };

        const shadowStyle = {
            position:"absolute",
            left: 4 * vW,
            right: 4 * vW,
            height: 2 * vW,
            top: 15 * vW,
            background: "rgba(0,0,0,0.2)",
            borderRadius: "50%"
        };

        return (
            <div style={style}>
                <img src={src} style={{display:"block",width:"100%"}} />
                { isPlayer ? <div style={shadowStyle} /> : null}
            </div>
        )
    }
}

export default Laptop;