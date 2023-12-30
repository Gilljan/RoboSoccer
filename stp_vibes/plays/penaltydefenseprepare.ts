import * as World from "base/world";
import {Vector} from "base/vector";
import {FriendlyRobot} from "base/robot";
import {MoveTo} from "stp_vibes/skills/moveto";


export class PenaltyDefensePrepare {

    constructor() {

    }

    run() {
        const robot = World.FriendlyRobotsById[0];

        const play = new MoveTo(robot);

        play.run(new Vector(0.0, -6.0), 0);
    }
}

