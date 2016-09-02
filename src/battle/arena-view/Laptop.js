import React from 'react';

class Laptop extends React.Component {

    getLeftStyle() {
        const {vW, isPlayer, isBigMessageBoard } = this.props;
        if (isPlayer) {
            return isBigMessageBoard ? 30 * vW : 43 * vW;
        }
        return 54 * vW;
    }

    render() {

        const {vW, isPlayer, extraStyle} = this.props;

        const src = isPlayer
            ? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/laptop-screen-view.svg"
            : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/laptop-back-view.svg";

        const style = {
            zIndex: isPlayer ? 1 : 5,
            position: "absolute",
            left: this.getLeftStyle(), //isPlayer ? 28 * vW : 52 * vW,
            top: isPlayer ? 40 * vW : 25 * vW,
            width: isPlayer ? 14 * vW : 9 * vW,
            transition: "left 0.4s ease-out",
            ...extraStyle
        };

        const shadowStyle = {
            position:"absolute",
            left: 4 * vW,
            right: 4 * vW,
            height: 2 * vW,
            top: 13 * vW,
            background: "rgba(0,0,0,0.2)",
            borderRadius: "50%"
        };

        return (
            <div style={style}>
                <img src={src} style={{display:"block",width:"100%"}} />
                {isPlayer ? <div style={shadowStyle} /> : null}
            </div>
        )
    }
}

export default Laptop;