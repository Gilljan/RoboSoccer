import * as World from "base/world";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Vector} from "base/vector";

let count: number = 0;
let random: number = 0;

export class PenaltyDefense {

    constructor() {

    }

    run() {
        const robot = World.FriendlyRobotsById[0];

        const play = new MoveTo(robot);
        
        if (count % 200 == 0) {
        
        const min = 0;
        const max = 17;
        random = (Math.floor(Math.random() * (max - min + 1)) + min - 10) / 10;

        }
        play.run(new Vector(0.0 + random, robot.pos.y), 0);
        
        count++;
    }
}
