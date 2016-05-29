const types = {
    SPAWN_RECT: null,
    SPAWN_PLAYER: null,

    PLAYER_MOVE: null,

    BEFORE_TICK: null
};

Object.keys(types).forEach(type => {
    types[type] = type;
});

export default types;