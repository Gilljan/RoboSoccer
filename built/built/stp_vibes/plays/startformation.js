define(["require", "exports", "base/world", "stp_vibes/skills/moveto", "base/vector", "stp_vibes/plays/game"], function (require, exports, World, moveto_1, vector_1, Game) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StartFormation = void 0;
    let count = 0;
    class StartFormation {
        constructor() {
        }
        run() {
            World.FriendlyRobots.forEach((value, index, array) => {
                const skill = new moveto_1.MoveTo(value);
                skill.run(new vector_1.Vector(3.0, 0.0 + index), 0);
            });
            count++;
            if (count >= 500) {
                Game.currentGameState = Game.GameState.BPrep;
            }
        }
    }
    exports.StartFormation = StartFormation;
});
//# sourceMappingURL=startformation.js.map