define(["require", "exports", "base/world", "base/vector", "stp_vibes/skills/moveto"], function (require, exports, World, vector_1, moveto_1) {
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
                    robot.setDribblerSpeed(1);
                    if (robot.hasBall(World.Ball)) {
                        exports.currentGameState = GameState.Move;
                    }
                    else {
                        let dirTowards = clacDirTowards(World.Ball.pos, robot);
                        new moveto_1.MoveTo(robot).run(World.Ball.pos, dirTowards, undefined, undefined, { ignoreBall: true });
                    }
                    break;
                }
                case GameState.Move: {
                    const robot = World.FriendlyRobotsById[1];
                    new moveto_1.MoveTo(robot).run(new vector_1.Vector(0.0, 4.0), 0);
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