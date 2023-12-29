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
export let currentGameState : GameState;
export class PenaltyOffensivePrepare {

	constructor() {
		currentGameState = GameState.GetBall;
	}

	 run() {
	 	switch(currentGameState) {
	 		case GameState.GetBall: {
			const robot = World.FriendlyRobotsById[1];
			const robotBall = World.FriendlyRobotsById[2];
			
			
			
			new MoveTo(robot).run(new Vector(0.0, 4.0), 0);
			//new Passto(robotBall, robot).run();
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
