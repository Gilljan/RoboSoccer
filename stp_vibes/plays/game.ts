import * as World from "base/world";
import {Vector} from "base/vector";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Dance} from "../tactics/dance";

export class Game {

	constructor() {

	}

	run() {
    		//amun.log("Game Play loop");
    		new Dance(World.FriendlyRobots).run();
	}
}
