import React, {Component} from 'react';
import keycode from 'keycode';

import Game from '../../../common/game';
import Renderer from './renderer';

export default class BaseGame extends Component {

    constructor(props) {
        super(props);

        this.game = new Game();
    }

    componentDidMount() {
        this.handleKey_bound = this.handleKey.bind(this);
        document.body.addEventListener('keydown', this.handleKey_bound);
        this.game.run();
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.handleKey_bound);
        this.game.stop();
    }

    handleKey(e) {
        const key = keycode(e);
        if (key === 'f1') {
             this.game.stop();
        } else if (key === 'f2') {
            this.game.run();
        } else {
            return;
        }

        e.preventDefault();
    }

    render() {
        return <Renderer game={this.game}/>
    }
}