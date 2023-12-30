import * as World from "base/world";
import {Vector} from "base/vector";
import {MoveTo} from "stp_vibes/skills/moveto";
import {FriendlyRobot} from "base/robot";
import {ShootTo} from "stp_vibes/skills/shootto";
import * as Game from "stp_vibes/plays/game";

export enum GameState {
    GetBall,
    Move,
    Finished
}

export let locked: boolean = false;
export var currentGameState: GameState = GameState.GetBall;

export class PenaltyOffensivePrepare {

    constructor() {

    }

    run() {
        switch (currentGameState) {
            case GameState.GetBall: {
                const robot = World.FriendlyRobotsById[(Game.shoots % 4)+1];
                //const robotBall = World.FriendlyRobotsById[2];

                let dirTowards = clacDirTowards(World.Ball.pos, robot);


                new ShootTo(robot, new Vector(0.0, 3.95), true).run();
                //new Passto(robot, World.FriendlyRobotsById[0]).run();


                break;
            }
            case GameState.Move: {
                const robot = World.FriendlyRobotsById[(Game.shoots % 4)+1];

                robot.setDribblerSpeed(1);

                new MoveTo(robot).run(new Vector(0.0, 3.85), robot.dir, undefined, undefined, {ignoreDefenseArea: true, ignoreBall: true});
                //amun.log(robot.speed);

                const vector: Vector = robot.pos;
                const neededPos: Vector = new Vector(0.0, 3.85);

                if (vetorDistance(vector, neededPos) < 0.025 && vectorLength(robot.speed) <= 0.05) {
                    //amun.log("Moving finished => shooting phase")


                    //amun.log(Game.currentGameState);
                    //robot.setDribblerSpeed(0);
                    if(vetorDistance(neededPos, World.Ball.pos) < 0.5) {
                    
                    currentGameState = GameState.Finished;
                    } else currentGameState = GameState.GetBall;

                }


                break;
            }
            case GameState.Finished: {
                const neededPos: Vector = new Vector(0.0, 3.85);
           
                const robot = World.FriendlyRobotsById[(Game.shoots % 4)+1];
                if(vetorDistance(robot.pos, new Vector(0.0, 2.0)) < 0.025) {
                if(vetorDistance(neededPos, World.Ball.pos) > 0.5) {
                currentGameState = GameState.GetBall;
                break;
                    }

                
                    if (Game.currentGameState == Game.GameState.BPrep || Game.currentGameState == Game.GameState.BShoot) {
                        (Game.currentGameState as any) = Game.GameState.BShoot;
                    } else (Game.currentGameState as any) = Game.GameState.YShoot;
                    currentGameState = GameState.GetBall;
                    //amun.log(currentGameState);
                } else new MoveTo(robot).run(new Vector(0.0, 2.0), robot.dir, 1.0, undefined, {ignoreDefenseArea: true, ignoreBall: true});
                
                break;
            }

        }/*
	 amun.log("Ball:" + World.Ball.pos);
		const robot = World.FriendlyRobotsById[(Game.shoots % 4)+1];
		const robotBall = World.FriendlyRobotsById[2];
		amun.log(World.FriendlyRobots);
		new MoveTo(robot).run(new Vector(0.0, 4.0), 0);
		new MoveTo(robotBall).run(World.Ball.pos, 0, undefined, undefined, {ignoreBall: false});
		*/
    }

}

function clacDirTowards(pos: Vector, robot: FriendlyRobot) {
    return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
}

function vetorDistance(vec1: Vector, vec2: Vector): number {
    return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}

function vectorLength(vec: Vector): number {
    return Math.abs(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
}
