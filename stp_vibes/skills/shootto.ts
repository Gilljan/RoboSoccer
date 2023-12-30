import {FriendlyRobot} from "base/robot";
import {CurvedMaxAccel} from "base/trajectory/curvedmaxaccel";
import {PathHelperParameters, setDefaultObstaclesByTable} from "base/trajectory/pathhelper";
import {Vector} from "base/vector";
import * as World from "base/world";
import * as PenaltyOffensivePrepare from "stp_vibes/plays/penaltyoffensiveprepare";
import {GameState} from "stp_vibes/plays/penaltyoffensiveprepare";
import * as Game from "stp_vibes/plays/game";

let offset: number = 0.6;
let orientationThreshold: number = 10 * (Math.PI / 180);

export class ShootTo {
    private readonly robot: FriendlyRobot;
    private readonly target: Vector;
    private readonly prep: boolean;

    constructor(robot: FriendlyRobot, target: Vector, prep: boolean) {
        this.robot = robot;
        this.target = target;
        this.prep = prep;
    }

    run() {
        let obstacles: PathHelperParameters;
        let ballPos: Vector = World.Ball.pos;

        //move behind the ball facing the player
        let ballToOther: Vector = this.target.sub(ballPos).normalized();
        let shootPositionOffseted = ballPos.add(ballToOther.mul(-offset));
        let shootPosition = ballPos.add(ballToOther.mul(-0.04));
        let dirTowards = calcDirTowards(ballPos, this.robot);
        let shootingPositionDir = calcDirTowards(shootPosition, this.robot);

        // Calculate the difference in orientation
        let orientationDifference = Math.abs(this.robot.dir - dirTowards);

        let isOnShootingPosition = shootPositionOffseted.sub(this.robot.pos).length() < offset + 0.1;

        if (!isOnShootingPosition || orientationDifference > orientationThreshold) {
            obstacles = {ignoreBall: false, ignorePenaltyDistance: true, ignoreDefenseArea: true};
            setDefaultObstaclesByTable(this.robot.path, this.robot, obstacles);
            this.robot.trajectory.update(CurvedMaxAccel, shootPositionOffseted, shootingPositionDir);

            return;
        }

        obstacles = {ignoreBall: true, ignorePenaltyDistance: true, ignoreDefenseArea: true};
        setDefaultObstaclesByTable(this.robot.path, this.robot, obstacles);
        this.robot.trajectory.update(CurvedMaxAccel, shootPosition, dirTowards);

        let hasBall = this.robot.hasBall(World.Ball, 0.1);

        if (hasBall && Math.abs(this.robot.dir - dirTowards) < 0.1) {
            if (this.prep) {
                PenaltyOffensivePrepare.currentGameState = GameState.Move;

                return;
            }

            this.robot.shoot(Math.random() * 6 + 4);

            if (!this.robot.hasBall(World.Ball, 0.02)) {
                amun.log("!!!!!!!!!!!");
                if (Game.currentGameState == Game.GameState.BShoot) {
                    (Game.currentGameState as any) = Game.GameState.BEnd;
                } else (Game.currentGameState as any) = Game.GameState.YEnd;
                Game.shoots = Game.shoots + 1;
                //amun.log(Game.shoots);
            }
        }

        function calcDirTowards(pos: Vector, robot: FriendlyRobot) {
            return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
        }
    }
}
