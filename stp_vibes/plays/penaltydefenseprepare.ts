import * as World from "base/world";
import {Vector} from "base/vector";
import {FriendlyRobot} from "base/robot";
import {MoveTo} from "stp_vibes/skills/moveto";
import * as Game from "stp_vibes/plays/game";


export class PenaltyDefensePrepare {

    constructor() {

    }

    run() {
        const robot = World.FriendlyRobotsById[0];

        const play = new MoveTo(robot);

        play.run(new Vector(0.0, -6.0), 0);

amun.log(vectorDistance(World.Ball.pos, new Vector(0.0, -3.85));
        if(vectorDistance(World.Ball.pos, new Vector(0.0, -3.85)) < 0.3) {
            if(Game.currentGameState == Game.GameState.BPrep) {
                (Game.currentGameState as any) = Game.GameState.BShoot;
            } else
                (Game.currentGameState as any) = Game.GameState.YShoot;
        }
    }
}

function vectorDistance(vec1: Vector, vec2: Vector): number {
    return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}
