import {Bodies, Body, World} from 'matter-js';
import {PLAYER_RADIUS, PLAYER_WEIGHT} from '../const';
import types from '../actions/types';

export default function(world, action) {
    switch(action.type) {

        case types.SPAWN_RECT: {
            const body = Bodies.rectangle(action.pos.x, action.pos.y, ...action.size);
            World.add(world, body);
            return world;
        }

        case types.SPAWN_PLAYER: {
            const player = Bodies.circle(action.pos.x, action.pos.y, PLAYER_RADIUS, {
                id: action.player_id,
                is_player: true,
                game: {
                    move_direction: {x: 0, y:0}
                }
            });

            Body.setMass(player, PLAYER_WEIGHT);
            World.add(world, [player]);
            return world;
        }

        default:
            return world;

    }
}