import {FriendlyRobot} from "base/robot";
import {CurvedMaxAccel} from "base/trajectory/curvedmaxaccel";
import {PathHelperParameters, setDefaultObstaclesByTable} from "base/trajectory/pathhelper";
import {Vector} from "base/vector";
import * as World from "base/world";
import * as PenaltyOffensivePrepare from "stp_vibes/plays/penaltyoffensiveprepare";
import {GameState} from "stp_vibes/plays/penaltyoffensiveprepare";
import * as Game from "stp_vibes/plays/game";

export class ShootTo {
    private robot: FriendlyRobot;
    private target: Vector;
    private prep: boolean;


    constructor(robot: FriendlyRobot, target: Vector, prep: boolean) {
        this.robot = robot;
        this.target = target;
        this.prep = prep;
    }

    // obstacles has an empty object as default, because that means none of the path helper parameters are set and the default is used
    // this includes the necessary obstacles for stop state and ball placement
    // maxSpeed is a helpful parameter to adjust for e.g. in stop state where the robots are not allowed to move faster than a certain speed
    run() {

        let obstacles: PathHelperParameters = {ignoreBall: false};
        //get the position of the other Player
        let otherPlayerPosition: Vector = this.target;
        //get the  poosition of the ball
        let ballPosition: Vector = World.Ball.pos;

        let offset = 0.6;

        //move behind the ball facing the player
        let ballToOther: Vector = otherPlayerPosition.sub(ballPosition).normalized();
        let shootPositionOffseted = ballPosition.add(ballToOther.mul(-offset));
        let shootPosition = ballPosition.add(ballToOther.mul(-0.04));
        let dirTowards = clacDirTowards(ballPosition, this.robot);
        let shootingPositionDir = clacDirTowards(shootPosition, this.robot);


        // Calculate the difference in orientation
        let orientationDifference = Math.abs(this.robot.dir - dirTowards);
        // Define a threshold for orientation alignment (e.g., 10 degrees in radians)
        let orientationThreshold = 10 * (Math.PI / 180);

        let isOnShootingPosition = shootPositionOffseted.sub(this.robot.pos).length() < offset + 0.1;

        if (!isOnShootingPosition || orientationDifference > orientationThreshold) {
            obstacles = {ignoreBall: false};
            setDefaultObstaclesByTable(this.robot.path, this.robot, obstacles);
            this.robot.trajectory.update(CurvedMaxAccel, shootPositionOffseted, shootingPositionDir);
        } else {
            obstacles = {ignoreBall: true};
            setDefaultObstaclesByTable(this.robot.path, this.robot, obstacles);
            this.robot.trajectory.update(CurvedMaxAccel, shootPosition, dirTowards);

            let reaced = this.robot.hasBall(World.Ball, 0.1);

            if (reaced && Math.abs(this.robot.dir - dirTowards) < 0.1) {
                if(this.prep) {
                    PenaltyOffensivePrepare.currentGameState = GameState.Move;
                } else {
                this.robot.shoot(10);
                if(!this.robot.hasBall(World.Ball, 0.02)) {
                (Game.currentGameState as any) = Game.GameState.BEnd;
                }}
                //amun.log("Shoot");
                //this.robot.shoot(10);
            }
        }


        //amun.log("Robot " + this.robot.id  + " With oriantation: " + this.robot.dir +   " is passing to " + this.otherPlayer.id + " at " + otherPlayerPosition + " with the ball at " + ballPosition + ". " + "DistanceOtherBall: " + ballToOther + "ShootPosition: " + shootPositionOffseted + "on shoot position: " + isOnShootingPosition);


        function clacDirTowards(pos: Vector, robot: FriendlyRobot) {
            return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
        }


    }

}
