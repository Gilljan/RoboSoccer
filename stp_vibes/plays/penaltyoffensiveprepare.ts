import * as World from "base/world";
import {Vector} from "base/vector";
import {MoveTo} from "stp_vibes/skills/moveto";
import {PathHelperParameters} from "base/trajectory/pathhelper";
import {FriendlyRobot} from "base/robot";
import {Passto} from "stp_vibes/skills/passto";
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
        amun.log(currentGameState);
        switch (currentGameState) {
            case GameState.GetBall: {
                const robot = World.FriendlyRobotsById[1];
                //const robotBall = World.FriendlyRobotsById[2];


                let dirTowards = clacDirTowards(World.Ball.pos, robot);


                new ShootTo(robot, new Vector(0.0, 3.95), true).run();
                //new Passto(robot, World.FriendlyRobotsById[0]).run();


                break;
            }
            case GameState.Move: {
                const robot = World.FriendlyRobotsById[1];

                robot.setDribblerSpeed(1);

                new MoveTo(robot).run(new Vector(0.0, 3.95), robot.dir);
                //amun.log(robot.speed);

                const vector: Vector = robot.pos;
                const neededPos: Vector = new Vector(0.0, 3.95);

                if (vetorDistance(vector, neededPos) < 0.025 && vectorLength(robot.speed) <= 0.05) {
                    //amun.log("Moving finished => shooting phase")


                    //amun.log(Game.currentGameState);
                    //robot.setDribblerSpeed(0);
                    currentGameState = GameState.Finished;

                }


                break;
            }
            case GameState.Finished: {
            
                const robot = World.FriendlyRobotsById[1];
            if(vetorDistance(robot.pos, new Vector(0.0, 3.0)) < 0.025) {
		    
                    if (Game.currentGameState == Game.GameState.BPrep || Game.currentGameState == GameState.BShoot) {
                    (Game.currentGameState as any) = Game.GameState.BShoot;
                } else (Game.currentGameState as any) = Game.GameState.YShoot;
                    } else new MoveTo(robot).run(new Vector(0.0, 3.7), robot.dir) ;
                
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

function clacDirTowards(pos: Vector, robot: FriendlyRobot) {
    return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
}

function vetorDistance(vec1: Vector, vec2: Vector): number {
    return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
}

function vectorLength(vec: Vector): number {
    return Math.abs(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
}
