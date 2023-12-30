define(["require", "exports", "base/world", "base/vector", "stp_vibes/skills/moveto", "stp_vibes/skills/shootto", "stp_vibes/plays/game"], function (require, exports, World, vector_1, moveto_1, shootto_1, Game) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyOffensivePrepare = exports.currentGameState = exports.locked = exports.GameState = void 0;
    var GameState;
    (function (GameState) {
        GameState[GameState["GetBall"] = 0] = "GetBall";
        GameState[GameState["Move"] = 1] = "Move";
        GameState[GameState["Finished"] = 2] = "Finished";
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
                    amun.log(robot.speed);
                    const vector = robot.pos;
                    const neededPos = new vector_1.Vector(0.0, 4.0);
                    if (vetorDistance(vector, neededPos) < 0.025 && vectorLength(robot.speed) <= 0.05) {
                        amun.log("Moving finished => shooting phase");
                        if (Game.currentGameState == Game.GameState.BPrep || Game.currentGameState == GameState.BShoot) {
                            Game.currentGameState = Game.GameState.BShoot;
                        }
                        else
                            Game.currentGameState = Game.GameState.YShoot;
                        amun.log(Game.currentGameState);
                        exports.currentGameState = GameState.Finished;
                    }
                    break;
                }
            }
        }
    }
    exports.PenaltyOffensivePrepare = PenaltyOffensivePrepare;
    function clacDirTowards(pos, robot) {
        return Math.atan2(pos.y - robot.pos.y, pos.x - robot.pos.x);
    }
    function vetorDistance(vec1, vec2) {
        return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }
    function vectorLength(vec) {
        return Math.abs(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
    }
});
//# sourceMappingURL=penaltyoffensiveprepare.js.map