import React from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import Renderer from './components/renderer';
import './style/index.styl';

import Game from '../../common/game';
import BrowserController from './browser_controller';

import {spawnRect, spawnPlayer} from '../../common/actions';

const game = new Game();
const PLAYER_ID = 'player-1';

game.dispatch(spawnRect({x: 200, y: 100}, [50, 50]));
game.dispatch(spawnPlayer(PLAYER_ID, {x: 100, y: 100}));


const ctrl = new BrowserController(PLAYER_ID);
game.addController(ctrl);

game.run();

ReactDOM.render(<Renderer game={game}/>, document.getElementById('mount'));

document.body.addEventListener('keydown', e => {
    const key = keycode(e);
    if (key === 'f1') {
        game.stop();
        e.preventDefault();
    } else if (key === 'f2') {
        game.run();
        e.preventDefault();
    }
});