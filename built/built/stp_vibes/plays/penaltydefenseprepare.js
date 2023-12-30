define(["require", "exports", "base/world", "base/vector", "stp_vibes/skills/moveto", "stp_vibes/plays/game"], function (require, exports, World, vector_1, moveto_1, Game) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyDefensePrepare = void 0;
    class PenaltyDefensePrepare {
        constructor() {
        }
        run() {
            const robot = World.FriendlyRobotsById[0];
            const play = new moveto_1.MoveTo(robot);
            play.run(new vector_1.Vector(0.0, -6.0), 0);
            if (vectorDistance(World.Ball.pos, new vector_1.Vector(0.0, -3.85)) < 0.3) {
                if (Game.currentGameState == Game.GameState.BPrep) {
                    Game.currentGameState = Game.GameState.BShoot;
                }
                else
                    Game.currentGameState = Game.GameState.YShoot;
            }
        }
    }
    exports.PenaltyDefensePrepare = PenaltyDefensePrepare;
    function vectorDistance(vec1, vec2) {
        return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }
});
//# sourceMappingURL=penaltydefenseprepare.js.map