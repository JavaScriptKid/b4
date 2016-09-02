import React from 'react';

class Laptop extends React.Component {
    render() {

        const {vW, isPlayer} = this.props;

        const src = isPlayer
            ? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/laptop-screen-view.svg"
            : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/laptop-back-view.svg";

        const style = {
            zIndex: isPlayer ? 1 : 5,
            position: "absolute",
            left: isPlayer ? 17 * vW : 3 * vW,
            top: isPlayer ? 10 * vW : 12 * vW,
            width: isPlayer ? 14 * vW : 10 * vW
        };

        return (
            <img style={style} src={src} />
        )
    }
}

export default Laptop;