import * as World from "base/world";
import {Vector} from "base/vector";
import {MoveTo} from "stp_vibes/skills/moveto";
import {PathHelperParameters} from "../../base/trajectory/pathhelper";
import { FriendlyRobot } from "base/robot";
import {Passto} from "stp_vibes/skills/passto";


export enum GameState {
	GetBall,
	Move
}
export let locked : boolean = false;
export let currentGameState : GameState = GameState.GetBall;
export class PenaltyOffensivePrepare {

	constructor() {
	
	}

	 run() {
	 amun.log(currentGameState);
	 	switch(currentGameState) {
	 		case GameState.GetBall: {
			const robot = World.FriendlyRobotsById[1];
			//const robotBall = World.FriendlyRobotsById[2];

			robot.setDribblerSpeed(1);
			

			if(robot.hasBall(World.Ball)) {
				currentGameState = GameState.Move;

			} else {
				let dirTowards = clacDirTowards(World.Ball.pos, robot);
				

				new MoveTo(robot).run(World.Ball.pos, dirTowards, undefined, undefined, {ignoreBall : true} );
				//new Passto(robot, World.FriendlyRobotsById[0]).run();
			}

				break;
			}
			case GameState.Move: {
				const robot = World.FriendlyRobotsById[1];

				new MoveTo(robot).run(new Vector(0.0, 4.0), 0);

				break;
			}
	 	
	 	}/*
	 amun.log("Ball:" + World.Ball.pos);
		const robot = World.FriendlyRobotsById[1];
		const robotBall = World.FriendlyRobotsById[2];
		amun.log(World.FriendlyRobots);
		new MoveTo(robot).run(new Vector(0.0, 4.0), 0);
		new MoveTo(robotBall).run(World.Ball.pos, 0, undefined, undefined, {ignoreBall: false});
		*/
	 }
	
}

function clacDirTowards(pos:Vector, robot: FriendlyRobot) {
            return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
        }
