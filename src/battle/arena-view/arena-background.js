import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
        backgroundStyle: state.battle.backgroundStyle
    }
})

class ArenaBackground extends React.Component {

    render() {

        const style = {
            background: this.props.backgroundStyle
        };

        return (
            <div style={style} className="battle-arena-overlay"></div>
        );
    }
}

export default ArenaBackground;