import * as World from "base/world";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Vector} from "base/vector";
import * as Game from "stp_vibes/plays/game";

let started: boolean = false;

let count: number = 0;
let targetX: number = 0;

export class PenaltyDefense {

    constructor() {

    }

    run() {
        const robot = World.FriendlyRobotsById[0];

        const play = new MoveTo(robot);

        if (!started) {
            started = World.Ball.speed.x != 0 || World.Ball.speed.y != 0;
        }
        //amun.log(started);

        if (count % 50 == 0) {
            const min = 0;
            const max = 10;

            if (vectorDistance(robot.pos, World.Ball.pos) < 2.5) {
                 targetX = World.Ball.pos.x
            } else {
                targetX = (Math.floor(Math.random() * (max - min + 1)) + min - 5) / 10;
            }
        }
        play.run(new Vector(targetX, robot.pos.y), 0);

        count++;

	amun.log(World.Ball.speed);
        if (vectorDistance(World.Ball.pos, new Vector(0.0, 3.85)) > 5.0 && World.Ball.speed.equals(new Vector(0, 0))) {
            amun.log("#1");
            if (Game.currentGameState == Game.GameState.BShoot) {
                (Game.currentGameState as any) = Game.GameState.BEnd;
            } else {
                (Game.currentGameState as any) = Game.GameState.YEnd;
            }
            Game.shoots = Game.shoots + 1;
        }
    }
}

function vectorDistance(vec1: Vector, vec2: Vector): number {
    return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}
