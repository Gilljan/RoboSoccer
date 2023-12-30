import * as World from "base/world";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Vector} from "base/vector";
import * as Game from "stp_vibes/plays/game";

let count: number = 0;

export class StartFormation {

    constructor() {
    }

    run() {
        World.FriendlyRobots.forEach((value, index, array) => {
            const skill = new MoveTo(value);


            skill.run(new Vector(3.0, 0.0 + index), 0);
        });

        count++;

        if (count >= 500) {
            (Game.currentGameState as any) = Game.GameState.BPrep;
        }
    }
}
