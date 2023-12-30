define(["require", "exports", "base/trajectory/curvedmaxaccel", "base/trajectory/pathhelper", "base/world", "stp_vibes/plays/penaltyoffensiveprepare", "stp_vibes/plays/penaltyoffensiveprepare", "stp_vibes/plays/game"], function (require, exports, curvedmaxaccel_1, pathhelper_1, World, PenaltyOffensivePrepare, penaltyoffensiveprepare_1, Game) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShootTo = void 0;
    let offset = 0.6;
    let orientationThreshold = 10 * (Math.PI / 180);
    class ShootTo {
        constructor(robot, target, prep) {
            this.robot = robot;
            this.target = target;
            this.prep = prep;
        }
        run() {
            let obstacles;
            let ballPos = World.Ball.pos;
            let ballToOther = this.target.sub(ballPos).normalized();
            let shootPositionOffseted = ballPos.add(ballToOther.mul(-offset));
            let shootPosition = ballPos.add(ballToOther.mul(-0.04));
            let dirTowards = calcDirTowards(ballPos, this.robot);
            let shootingPositionDir = calcDirTowards(shootPosition, this.robot);
            let orientationDifference = Math.abs(this.robot.dir - dirTowards);
            let isOnShootingPosition = shootPositionOffseted.sub(this.robot.pos).length() < offset + 0.1;
            if (!isOnShootingPosition || orientationDifference > orientationThreshold) {
                obstacles = { ignoreBall: false, ignorePenaltyDistance: true, ignoreDefenseArea: true };
                (0, pathhelper_1.setDefaultObstaclesByTable)(this.robot.path, this.robot, obstacles);
                this.robot.trajectory.update(curvedmaxaccel_1.CurvedMaxAccel, shootPositionOffseted, shootingPositionDir);
                return;
            }
            obstacles = { ignoreBall: true, ignorePenaltyDistance: true, ignoreDefenseArea: true };
            (0, pathhelper_1.setDefaultObstaclesByTable)(this.robot.path, this.robot, obstacles);
            this.robot.trajectory.update(curvedmaxaccel_1.CurvedMaxAccel, shootPosition, dirTowards);
            let hasBall = this.robot.hasBall(World.Ball, 0.1);
            if (hasBall && Math.abs(this.robot.dir - dirTowards) < 0.1) {
                if (this.prep) {
                    PenaltyOffensivePrepare.currentGameState = penaltyoffensiveprepare_1.GameState.Move;
                    return;
                }
                this.robot.shoot(Math.random() * 6 + 4);
                if (!this.robot.hasBall(World.Ball, 0.02)) {
                    amun.log("!!!!!!!!!!!");
                    if (Game.currentGameState == Game.GameState.BShoot) {
                        Game.currentGameState = Game.GameState.BEnd;
                    }
                    else
                        Game.currentGameState = Game.GameState.YEnd;
                    Game.shoots = Game.shoots + 1;
                }
            }
            function calcDirTowards(pos, robot) {
                return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
            }
        }
    }
    exports.ShootTo = ShootTo;
});
//# sourceMappingURL=shootto.js.map