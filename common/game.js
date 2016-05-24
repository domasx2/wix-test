import {Engine, Events, World, Bodies, Body, Runner} from 'matter-js';
import rootReducer from './reducers';

import {PLAYER_RADIUS, PLAYER_WEIGHT} from './const';

export default class Game {
    constructor() {
        const world = this.world = World.create({
            gravity: {
                x: 0,
                y: 0,
                scale: 0
            }
        });

        this.engine = Engine.create({
            world
        });

        Events.on(this.engine, 'beforeUpdate', () => this.beforeUpdate());

        this.controllers = [];

        this.runner = null;
    }

    addRect(x, y, width, height) {
        const rect = Bodies.rectangle(x, y, width, height);
        World.add(this.engine.world, [rect]);
    }

    addPlayer(id, x, y) {
        const player = Bodies.circle(x, y, PLAYER_RADIUS, {
            id,
            game: {
                move_direction: {x: 0, y:0}
            }
        });

        Body.setMass(player, PLAYER_WEIGHT);

        console.log('mass', player.mass);

        World.add(this.engine.world, [player]);
    }

    addController(controller) {
        this.controllers.push(controller);
    }

    beforeUpdate() {
        //gather actions
        const actions = [].concat.apply([], this.controllers.map(ctrl => ctrl.drainActions()));

        //reduce world using these actions
        actions.forEach(rootReducer.bind(null, this.world));

    }

    run() {
        
        this.runner = Engine.run(this.engine);
    }

    stop() {
        if (this.runner) {
            Runner.stop(this.runner);
        }
    }
}