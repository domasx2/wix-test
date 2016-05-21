import React from 'react';
import ReactDOM from 'react-dom';
import Renderer from './components/renderer';
import './style/index.styl';

import Game from '../../common/game';

const game = new Game();
game.run();

ReactDOM.render(<Renderer game={game}/>, document.getElementById('mount'));