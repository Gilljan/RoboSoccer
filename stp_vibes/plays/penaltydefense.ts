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

            if (vectorDistance(robot.pos, World.Ball.pos) < 2.0) {
                play.run(new Vector(World.Ball.pos.x, robot.pos.y), 0);

            } else {
                random = (Math.floor(Math.random() * (max - min + 1)) + min - 10) / 10;
                play.run(new Vector(random, robot.pos.y), 0);
            }
        }

        count++;
    }
}

function vectorDistance(vec1: Vector, vec2: Vector): number {
    return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}
