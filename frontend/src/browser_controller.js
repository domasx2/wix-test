import keycode from 'keycode';
import { Vector } from 'matter-js';
import PlayerController from '../../common/player_controller';

const BINDINGS = {
    'w': 'up',
    's': 'down',
    'a': 'left',
    'd': 'right'
};

const DIRECTION = {
    'up': {x: 0, y: -1},
    'down': {x: 0, y: 1},
    'right': {x: 1, y: 0},
    'left': {x:-1, y: 0}
}


export default class BrowserController extends PlayerController {

    constructor(player_id) {

        super(player_id);

        this.onKeyDown_bound = this.onKeyDown.bind(this);
        this.onKeyUp_bound = this.onKeyUp.bind(this);
        this.init();

        this.actions_down = {};
    }

    move() {
        const vec = {x: 0, y: 0};
        Object.keys(DIRECTION).forEach(action => {
            if (this.actions_down[action]) {
                Vector.add(vec, DIRECTION[action], vec);
            }
        });
        super.move(vec);
    }

    onKeyDown(e) {
        const action = BINDINGS[keycode(e)];

        console.log('keydown', keycode(e), action);

        if (action) {
            this.actions_down[action] = true;
        }

        if (DIRECTION[action]) {
            this.move();
        }

    }

    onKeyUp(e) {
        const action = BINDINGS[keycode(e)];
        if (action) {
            this.actions_down[action] = false;
        }

        if (DIRECTION[action]) {
            this.move();
        }
    }   

    init() {
        document.body.addEventListener('keydown', this.onKeyDown_bound);
        document.body.addEventListener('keyup', this.onKeyUp_bound);
    }

    destroy() {
        document.body.removeEventListener('keydown', this.onKeyDown_bound);
        document.body.removeEventListener('keyup', this.onKeyUp_bound);
    }
}