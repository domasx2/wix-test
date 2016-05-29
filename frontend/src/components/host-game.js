import React from 'react';
import BrowserController from '../browser_controller';
import BaseGame from './base-game';

import {spawnRect, spawnPlayer} from '../../../common/actions';

const PLAYER_ID = 'player-1';

export default class HostGame extends BaseGame {
    constructor(props) {
        super(props);
        const game= this.game;
        

        game.dispatch(spawnRect({x: 200, y: 100}, [50, 50]));
        game.dispatch(spawnPlayer(PLAYER_ID, {x: 100, y: 100}));


        const ctrl = new BrowserController(PLAYER_ID);
        game.addController(ctrl);

        this.game = game;
    }

    componentDidMount() {
        this.game.run();
    }

    componentWillUnmount() {
        this.game.stop();
    }
}