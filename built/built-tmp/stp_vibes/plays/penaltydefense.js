define(["require", "exports", "base/world", "stp_vibes/skills/moveto", "base/vector"], function (require, exports, World, moveto_1, vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyDefense = void 0;
    let count = 0;
    let random = 0;
    class PenaltyDefense {
        constructor() {
        }
        run() {
            const robot = World.FriendlyRobotsById[0];
            const play = new moveto_1.MoveTo(robot);
            if (count % 200 == 0) {
                const min = 0;
                const max = 17;
                random = (Math.floor(Math.random() * (max - min + 1)) + min - 10) / 10;
            }
            play.run(new vector_1.Vector(0.0 + random, robot.pos.y), 0);
            count++;
        }
    }
    exports.PenaltyDefense = PenaltyDefense;
});
//# sourceMappingURL=penaltydefense.js.map