import {Body} from 'matter-js';

import types from '../actions/types';

export default function(world, action) {

    if (action.player_id) {
        const players = world.bodies.filter(body => body.id === action.player_id);
        if (players.length) {
            const player = players[0];

            //set move direction
            switch (action.type) {
                case types.PLAYER_MOVE:
                    player.game.move_direction = action.move_vec;
                    return world;
            }
        }
    }

    if (action.type === types.BEFORE_TICK) {
        console.log('hoo');
        world.bodies.filter(body => body.is_player).forEach(player => {
            Body.setVelocity(player, {x:0, y:0});
            Body.applyForce(player, player.position, player.game.move_direction);
        });
    }

    return world;
}