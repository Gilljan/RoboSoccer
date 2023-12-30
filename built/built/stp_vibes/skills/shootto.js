define(["require", "exports", "base/trajectory/curvedmaxaccel", "base/trajectory/pathhelper", "base/world", "stp_vibes/plays/penaltyoffensiveprepare", "stp_vibes/plays/penaltyoffensiveprepare", "stp_vibes/plays/game"], function (require, exports, curvedmaxaccel_1, pathhelper_1, World, PenaltyOffensivePrepare, penaltyoffensiveprepare_1, Game) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShootTo = void 0;
    class ShootTo {
        constructor(robot, target, prep) {
            this.robot = robot;
            this.target = target;
            this.prep = prep;
        }
        run() {
            let obstacles = { ignoreBall: false };
            let otherPlayerPosition = this.target;
            let ballPosition = World.Ball.pos;
            let offset = 0.6;
            let ballToOther = otherPlayerPosition.sub(ballPosition).normalized();
            let shootPositionOffseted = ballPosition.add(ballToOther.mul(-offset));
            let shootPosition = ballPosition.add(ballToOther.mul(-0.04));
            let dirTowards = clacDirTowards(ballPosition, this.robot);
            let shootingPositionDir = clacDirTowards(shootPosition, this.robot);
            let orientationDifference = Math.abs(this.robot.dir - dirTowards);
            let orientationThreshold = 10 * (Math.PI / 180);
            let isOnShootingPosition = shootPositionOffseted.sub(this.robot.pos).length() < offset + 0.1;
            if (!isOnShootingPosition || orientationDifference > orientationThreshold) {
                obstacles = { ignoreBall: false };
                (0, pathhelper_1.setDefaultObstaclesByTable)(this.robot.path, this.robot, obstacles);
                this.robot.trajectory.update(curvedmaxaccel_1.CurvedMaxAccel, shootPositionOffseted, shootingPositionDir);
            }
            else {
                obstacles = { ignoreBall: true };
                (0, pathhelper_1.setDefaultObstaclesByTable)(this.robot.path, this.robot, obstacles);
                this.robot.trajectory.update(curvedmaxaccel_1.CurvedMaxAccel, shootPosition, dirTowards);
                let reaced = this.robot.hasBall(World.Ball, 0.1);
                if (reaced && Math.abs(this.robot.dir - dirTowards) < 0.1) {
                    if (this.prep) {
                        PenaltyOffensivePrepare.currentGameState = penaltyoffensiveprepare_1.GameState.Move;
                    }
                    else {
                        this.robot.shoot(10);
                        if (!this.robot.hasBall(World.Ball, 0.02)) {
                            amun.log("!!!!!!!!!!!");
                            if (Game.currentGameState == Game.GameState.BShoot) {
                                Game.currentGameState = Game.GameState.BEnd;
                            }
                            else
                                Game.currentGameState = Game.GameState.YEnd;
                        }
                    }
                }
            }
            function clacDirTowards(pos, robot) {
                return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
            }
        }
    }
    exports.ShootTo = ShootTo;
});
//# sourceMappingURL=shootto.js.map