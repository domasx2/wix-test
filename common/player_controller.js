import {movePlayer} from './actions';

export default class PlayerController {

    constructor(player_id) {
        this.player_id = player_id;
        this.queued_events = [];
        this.move_vec = {x: 0, y: 0};
    }

    queueAction(action, unique=false) {
        if (unique) {
            this.queued_events = this.queued_events.filter(e => e.type !== action.type);
        }
        this.queued_events.push(action);
    }

    move(vec) {
        //console.log(`move ${this.player_id} ${vec.x} ${vec.y}`);
        if (this.move_vec.x !== vec.x || this.move_vec.y !== vec.y) {
            this.queueAction(movePlayer(this.player_id, vec), true);
            this.move_vec = vec;
        }
    }

    drainActions() {
        const queued_events = this.queued_events;
        
        this.queued_events = [];
        return queued_events;
    }
}