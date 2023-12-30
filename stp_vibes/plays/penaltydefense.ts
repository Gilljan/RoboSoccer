import * as World from "base/world";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Vector} from "base/vector";

export class PenaltyDefense {

    constructor() {

    }

    run() {
        const robot = World.FriendlyRobotsById[0];

        const play = new MoveTo(robot);

        const min = 0;
        const max = 20;
        const randomInRange = (Math.floor(Math.random() * (max - min + 1)) + min - 10) / 10;

        play.run(new Vector(robot.pos.x, robot.pos.y + randomInRange), 0);
    }
}