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
    class PenaltyOffensivePrepare {
        constructor() {
            exports.currentGameState = GameState.GetBall;
        }
        run() {
            switch (exports.currentGameState) {
                case GameState.GetBall: {
                    const robot = World.FriendlyRobotsById[1];
                    const robotBall = World.FriendlyRobotsById[2];
                    new moveto_1.MoveTo(robot).run(new vector_1.Vector(0.0, 4.0), 0);
                    break;
                }
            }
        }
    }
    exports.PenaltyOffensivePrepare = PenaltyOffensivePrepare;
});
//# sourceMappingURL=penaltyoffensiveprepare.js.map