import types from './types';

export function spawnPlayer(player_id, pos) {
    return {
        type: types.SPAWN_PLAYER,
        player_id,
        pos
    };
}

export function spawnRect(pos, size) {
    return {
        type: types.SPAWN_RECT,
        pos,
        size
    };
}

export function movePlayer(player_id, move_vec) {
    return {
        type: types.PLAYER_MOVE,
        player_id,
        move_vec
    };
}