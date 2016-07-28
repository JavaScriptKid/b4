import React from 'react';

class Cell extends React.Component {

    getBackground(content) {

        if (typeof content == "number") {
            if (content >= 7) {
                return {
                    color: "white",
                    background: "#27ae60"
                }
            }
            if (content <= 3) {
                return {
                    color: "white",
                    background: "#e74c3c"
                }
            }
            if (content == 5) {
                return {
                    background: "#bdc3c7"
                }
            }

            //Or yellow
            return {
                background: "#f1c40f"
            }
        }
        return {}
    }

    render() {

        const style = {
            ...this.getBackground(this.props.content)
        };

        return (
            <td style={style}>{this.props.content}</td>
        )
    }
}

export default Cell;