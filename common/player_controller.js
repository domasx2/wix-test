import events from './events';

export default class PlayerController {

    constructor(player_id) {
        this.player_id = player_id;
        this.queued_events = [];
    }

    queueAction(type, payload, unique=false) {
        if (unique) {
            this.queued_events = this.queued_events.filter(e => e.type !== type);
        }
        this.queued_events.push({
            type,
            payload,
            player_id: this.player_id
        });
    }

    move(vec) {
        //console.log(`move ${this.player_id} ${vec.x} ${vec.y}`);
        this.queueAction(events.PLAYER_MOVE, vec, true);
    }

    drainActions() {
        const queued_events = this.queued_events;
        
        this.queued_events = [];
        return queued_events;
    }
}