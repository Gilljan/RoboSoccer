define(["require", "exports", "base/trajectory/curvedmaxaccel", "base/trajectory/pathhelper", "base/world"], function (require, exports, curvedmaxaccel_1, pathhelper_1, World) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Passto = void 0;
    class Passto {
        constructor(robot, otherPlayer) {
            this.robot = robot;
            this.otherPlayer = otherPlayer;
        }
        run() {
            let obstacles = { ignoreBall: false };
            let otherPlayerPosition = this.otherPlayer.pos;
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
                    this.robot.shoot(3);
                }
            }
            function clacDirTowards(pos, robot) {
                return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
            }
        }
    }
    exports.Passto = Passto;
});
//# sourceMappingURL=passto.js.map