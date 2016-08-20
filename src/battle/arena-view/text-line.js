import React from 'react';
import { connect } from 'react-redux'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../../helpers/single-keypress-binding';
import {sfxTypeBlip} from '../../_data/_sfx'

class TextLine extends React.Component {

    constructor(props) {
        super();

        this.timeout = null;
        this.acceptClick = false;


        this.state = {
            characterIndex: 0,
            showBlinker: false
        };
    }

    componentDidMount() {
        /* Mini delay before kicking off the message */
        this.initTimeout = setTimeout(() => {
            this.initMessaging();
        }, 100)
    }

    handleClick() {
        if (this.acceptClick) {

            //For some reason, this can not be a regular click. Was not retriggering re-rendering
            setTimeout(()=> {
                this.promptHandler();
            }, 10)

        }
    }

    promptHandler() {

        this.setState({
            showBlinker: false
        });

        this.acceptClick = false;
        removeKeyboardSinglePress("battle-text-line");

        //Close the gates
        this.props.handleUserPrompt();

    }

    handleDone() {


        this.setState({
            showBlinker: true
        });

        var handler = () => {
            this.promptHandler()
        };

        if (this.props.needsUserPrompt) {
            //Open the gates for both clicks and Enter
            this.acceptClick = true;
            addKeyboardSinglePress(13, handler, "battle-text-line");
        }


    }


    initMessaging() {
        var self = this;
        function increase() {
            sfxTypeBlip.play(); /* Play the blip */

            self.setState({
                characterIndex: self.state.characterIndex + 1
            }, () => {

                const node = self.props.content[self.state.characterIndex] || {delayBefore: 0};
                if (self.state.characterIndex < self.props.content.length) {
                    self.timeout = setTimeout(increase, node.delayBefore);
                } else {




                    self.handleDone();
                }
            })
        }
        increase();
    }

    render() {

        const baseUnit = this.props.vW;
        const blinkerStyle = {
            width: baseUnit * 1.2,
            height: baseUnit * 1.2,
            background: "#000",
            position: "absolute",
            right: baseUnit * 1.2,
            bottom: baseUnit * 1.2,
            animation: "blink 1.1s steps(2, start) infinite"
        };


        var spans = this.props.content.map((d,i) => {
            const style = {
                visibility: (i < this.state.characterIndex) ? "visible" : "hidden"
            };
            return <span style={style} key={i}>{d.content}</span>
        });

        const style = {
            height:"100%"
        };



        return (
            <div onClick={::this.handleClick} style={style}>
                {spans}
                {this.state.showBlinker ? <div style={blinkerStyle}></div> : null}
            </div>
        )
    }
}

export default TextLine;