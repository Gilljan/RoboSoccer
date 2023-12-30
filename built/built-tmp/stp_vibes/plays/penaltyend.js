define(["require", "exports", "base/world", "stp_vibes/plays/game", "base/vector", "stp_vibes/skills/moveto"], function (require, exports, World, Game, vector_1, moveto_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyEnd = void 0;
    class PenaltyEnd {
        constructor() {
        }
        run(defense) {
            var index = (Game.shoots % 5) == 0 ? 5 : (Game.shoots % 5);
            const robot = defense ? World.FriendlyRobotsById[0] : World.FriendlyRobotsById[index];
            new moveto_1.MoveTo(robot).run(defense ? new vector_1.Vector(0, -6) : new vector_1.Vector(3.0, 0.0 + index), robot.dir);
            if (!defense) {
                if (vectorDistance(robot.pos, new vector_1.Vector(3.0, 0.0 + index)) < 0.1) {
                    if (Game.currentGameState == Game.GameState.BEnd) {
                        Game.currentGameState = Game.GameState.YPrep;
                    }
                    else
                        Game.currentGameState = Game.GameState.BPrep;
                }
            }
            else {
                const opponentRobot = World.OpponentRobotsById[index];
                if (vectorDistance(opponentRobot.pos, new vector_1.Vector(-3.0, -index)) < 0.1) {
                    if (Game.currentGameState == Game.GameState.BEnd) {
                        Game.currentGameState = Game.GameState.YPrep;
                    }
                    else {
                        Game.currentGameState = Game.GameState.BPrep;
                    }
                }
            }
        }
    }
    exports.PenaltyEnd = PenaltyEnd;
    function vectorDistance(vec1, vec2) {
        return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }
});
//# sourceMappingURL=penaltyend.js.map