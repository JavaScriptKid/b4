import React from 'react';
import { connect } from 'react-redux'
//import {Howl} from 'howler'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../../helpers/single-keypress-binding';
//import {incrementRolloutStation2} from '../../battles/rollout/rollout-station-navigator'

//var typeBlip = new Howl({
//    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/Blip-0.0_bip_3.1.wav'],
//    volume: 0.5
//});


class TextLine extends React.Component {

    constructor(props) {
        super();

        this.timeout = null;
        this.acceptClick = false;


        this.state = {
            characterIndex: 0,
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


        this.acceptClick = false;
        removeKeyboardSinglePress("battle-text-line");

        //Close the gates
        this.props.handleUserPrompt();

    }

    handleDone() {
        console.log('done!');

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
            //typeBlip.play(); /* Play the blip */

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
        var spans = this.props.content.map((d,i) => {
            const style = {
                visibility: (i < this.state.characterIndex) ? "visible" : "hidden"
            };
            return <span style={style} key={i}>{d.content}</span>
        });

        return (
            <div onClick={::this.handleClick}>
                {spans}
            </div>
        )
    }
}

export default TextLine;