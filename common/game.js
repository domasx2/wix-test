import {Engine, World, Bodies} from 'matter-js';

export default class Game {
    constructor() {
        const world = this.world = World.create({
            gravity: {
                x: 0,
                y: 0,
                scale: 0
            }
        });

        const engine = this.engine = Engine.create({
            world
        });


        const dude = this.dude = Bodies.circle(100, 100, 20);

        World.add(engine.world, [dude]);
    }

    run() {
        Engine.run(this.engine);
    }
}