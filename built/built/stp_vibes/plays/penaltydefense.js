define(["require", "exports", "base/world", "stp_vibes/skills/moveto", "base/vector", "stp_vibes/plays/game"], function (require, exports, World, moveto_1, vector_1, Game) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyDefense = void 0;
    let started = false;
    let count = 0;
    let targetX = 0;
    class PenaltyDefense {
        constructor() {
        }
        run() {
            const robot = World.FriendlyRobotsById[0];
            const play = new moveto_1.MoveTo(robot);
            if (!started) {
                started = World.Ball.speed.x != 0 || World.Ball.speed.y != 0;
            }
            if (count % 50 == 0) {
                const min = 0;
                const max = 10;
                if (vectorDistance(robot.pos, World.Ball.pos) < 2.5) {
                    targetX = World.Ball.pos.x;
                }
                else {
                    targetX = (Math.floor(Math.random() * (max - min + 1)) + min - 5) / 10;
                }
            }
            play.run(new vector_1.Vector(targetX, robot.pos.y), 0);
            count++;
            if (World.Ball.pos.y < -5.6) {
                amun.log("#1");
                if (Game.currentGameState == Game.GameState.BShoot) {
                    Game.currentGameState = Game.GameState.BEnd;
                }
                else {
                    Game.currentGameState = Game.GameState.YEnd;
                }
                Game.shoots = Game.shoots + 1;
            }
        }
    }
    exports.PenaltyDefense = PenaltyDefense;
    function vectorDistance(vec1, vec2) {
        return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }
});
//# sourceMappingURL=penaltydefense.js.map