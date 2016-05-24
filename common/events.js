const events = {
    TICK: null,
    PLAYER_MOVE: null
};

Object.keys(events).forEach(key => {
    events[key] = key;
});

export default events;