import spawns from './spawns';
import player from './player';

const reducers = [spawns, player];

export default function (world, action) {
    reducers.forEach(reducer => reducer(world, action))
}