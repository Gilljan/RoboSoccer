import * as World from "base/world";
import {Vector} from "base/vector";
import {MoveTo} from "stp_vibes/skills/moveto";
import {PathHelperParameters} from "../../base/trajectory/pathhelper";

export class PenaltyOffensivePrepare {


	constructor() {

	}

	 run() {
	 amun.log("Ball:" + World.Ball.pos);
		const robot = World.FriendlyRobotsById[1];
		amun.log(World.FriendlyRobots);
		new MoveTo(robot).run(new Vector(0.0, 4.0), 0);
		//new MoveTo(robot).run(new Vector(0.0, 4.0), 0);
	 }
}
