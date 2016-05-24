import {Body} from 'matter-js';

import events from '../events';

export default function(world, action) {

    if (action.player_id) {
        const players = world.bodies.filter(body => body.id === action.player_id);
        if (players.length) {
            const player = players[0];

            //set move direction
            switch (action.type) {
                case events.PLAYER_MOVE:
                    player.game.move_direction = action.payload;
            }

            Body.setVelocity(player, {x:0, y:0});
            Body.applyForce(player, player.position, player.game.move_direction);
        }
    }

    return world;
}