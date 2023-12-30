import * as World from "base/world";
import * as Game from "stp_vibes/plays/game";
import {Vector} from "base/vector";
import {MoveTo} from "stp_vibes/skills/moveto";

export class PenaltyEnd {

    constructor() {
    }

    run(defense: boolean) {
        var index = (Game.shoots % 5) == 0 ? 5 : (Game.shoots % 5);
        const robot = defense ? World.FriendlyRobotsById[0] : World.FriendlyRobotsById[index];

        

        new MoveTo(robot).run(defense ? new Vector(0, -6) : new Vector(3.0, 0.0 + index), robot.dir);

        if(!defense) {
        amun.log("1 : " + vectorDistance(robot.pos, new Vector(3.0, 0.0 + index)));
            if(vectorDistance(robot.pos, new Vector(3.0, 0.0 + index)) < 0.1) {
                if(Game.currentGameState == Game.GameState.BEnd) {
                    (Game.currentGameState as any) = Game.GameState.YPrep;
                } else (Game.currentGameState as any) = Game.GameState.BPrep;
            }
        } else {
            const opponentRobot = World.OpponentRobotsById[index];
amun.log("2: " + vectorDistance(opponentRobot.pos, new Vector(-3.0, - index)));
            if(vectorDistance(opponentRobot.pos, new Vector(-3.0, - index)) < 0.1) {
                if(Game.currentGameState == Game.GameState.BEnd) {
                    (Game.currentGameState as any) = Game.GameState.YPrep;
                } else {(Game.currentGameState as any) = Game.GameState.BPrep;}
            }
        }
    }
}

function vectorDistance(vec1: Vector, vec2: Vector): number {
    return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}
