define(["require", "exports", "base/world", "base/vector", "stp_vibes/skills/moveto", "stp_vibes/skills/shootto"], function (require, exports, World, vector_1, moveto_1, shootto_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyOffensivePrepare = exports.currentGameState = exports.locked = exports.GameState = void 0;
    var GameState;
    (function (GameState) {
        GameState[GameState["GetBall"] = 0] = "GetBall";
        GameState[GameState["Move"] = 1] = "Move";
    })(GameState = exports.GameState || (exports.GameState = {}));
    exports.locked = false;
    exports.currentGameState = GameState.GetBall;
    class PenaltyOffensivePrepare {
        constructor() {
        }
        run() {
            amun.log(exports.currentGameState);
            switch (exports.currentGameState) {
                case GameState.GetBall: {
                    const robot = World.FriendlyRobotsById[1];
                    let dirTowards = clacDirTowards(World.Ball.pos, robot);
                    new shootto_1.ShootTo(robot, new vector_1.Vector(0.0, 4.0)).run();
                    break;
                }
                case GameState.Move: {
                    const robot = World.FriendlyRobotsById[1];
                    robot.setDribblerSpeed(1);
                    new moveto_1.MoveTo(robot).run(new vector_1.Vector(0.0, 4.0), robot.dir);
                    break;
                }
            }
        }
    }
    exports.PenaltyOffensivePrepare = PenaltyOffensivePrepare;
    function clacDirTowards(pos, robot) {
        return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
    }
});
//# sourceMappingURL=penaltyoffensiveprepare.js.map