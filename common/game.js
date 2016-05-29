import {Engine, Events, World, Bodies, Body, Runner} from 'matter-js';
import CircularJSON from 'circular-json';
import EventEmitter from 'events';
import rootReducer from './reducers';
import types from './actions/types';
import {PLAYER_RADIUS, PLAYER_WEIGHT} from './const';

export default class Game extends EventEmitter {
    constructor() {
        super();

        const world = World.create({
            gravity: {
                x: 0,
                y: 0,
                scale: 0
            }
        });

        this.engine = Engine.create({
            world
        });

        this.controllers = [];

        this.runner = null;

        this.beforeTick_bound = this.beforeTick.bind(this);
        this.afterTick_bound = this.afterTick.bind(this);

        this.frames = [];

        this.controllers = [];

        this.action_queue = [];
    }

    dispatch(action) {
        this.action_queue.push(action);
    }

    addController(controller) {
        this.controllers.push(controller);
    }

    beforeTick() {

        this.emit('beforeTick');

        this.controllers.forEach(controller => {
            controller.drainActions().forEach(action => {
                this.dispatch(action);
            });
        });

        const frame = {
            t: new Date().getTime(),
            actions: this.action_queue
        };

        this.action_queue = [];

        //reduce world using these actions
        frame.actions.forEach(rootReducer.bind(null, this.engine.world));
        rootReducer(this.engine.world, {type: types.BEFORE_TICK});
    }

    afterTick() {

        this.emit('afterTick');
    }

    run() {
        this.runner = Engine.run(this.engine);
        Events.on(this.runner, 'beforeTick', this.beforeTick_bound);
        Events.on(this.runner, 'afterTick', this.afterTick_bound);
    }

    stop() {
        if (this.runner) {
            Runner.stop(this.runner);
            Events.off(this.runner, 'beforeTick', this.beforeTick_bound);
            Events.off(this.runner, 'afterTick', this.afterTick_bound);
        }
    }
}