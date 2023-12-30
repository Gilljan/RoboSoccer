import * as World from "base/world";
import {ShootTo} from "stp_vibes/skills/shootto";
import * as Game from "stp_vibes/plays/game";
import {Vector} from "base/vector";
import {FriendlyRobot} from "base/robot";
import {MoveTo} from "stp_vibes/skills/moveto";


export class PenaltyEnd {

    constructor() {
    }

    run(defense: boolean) {
        const robot = defense ? World.FriendlyRobotsById[0] : World.FriendlyRobotsById[1];

        new MoveTo(robot).run(defense ? new Vector(0, -6) : new Vector(3.5, 2.5), robot.dir);

        if(!defense) {
            if(vectorDistance(robot.pos, new Vector(3.5, 2.5)) < 0.1) {
                if(Game.GameState.BEnd) {
                    (Game.currentGameState as any) = Game.GameState.YPrep;
                } else (Game.currentGameState as any) = Game.GameState.BPrep;
            }
        }
    }
}

function vectorDistance(vec1: Vector, vec2: Vector): number {
    return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}