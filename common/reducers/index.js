import player from './player';

const reducers = [player];

export default function (world, action) {
    reducers.forEach(reducer => reducer(world, action))
}