import * as World from "base/world";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Vector} from "base/vector";

let count: number = 0;
let targetX: number = 0;

export class PenaltyDefense {

    constructor() {

    }

    run() {
        const robot = World.FriendlyRobotsById[0];

        const play = new MoveTo(robot);

        if (count % 50 == 0) {

            const min = 0;
            const max = 10;

amun.log(vectorDistance(robot.pos, World.Ball.pos) < 2.0);
            if (vectorDistance(robot.pos, World.Ball.pos) < 3.0) {
                 targetX = World.Ball.pos.x

            } else {
                targetX = (Math.floor(Math.random() * (max - min + 1)) + min - 5) / 10;

            }
            
        }
        play.run(new Vector(targetX, robot.pos.y), 0);

        count++;
    }
}

function vectorDistance(vec1: Vector, vec2: Vector): number {
    return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}
