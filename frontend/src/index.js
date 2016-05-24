import React from 'react';
import ReactDOM from 'react-dom';
import Renderer from './components/renderer';
import './style/index.styl';

import Game from '../../common/game';
import BrowserController from './browser_controller';

const game = new Game();
game.addRect(200, 100, 50, 100);
game.addPlayer('player-1', 100, 100);
game.addController(new BrowserController('player-1'));

game.run();

ReactDOM.render(<Renderer game={game}/>, document.getElementById('mount'));