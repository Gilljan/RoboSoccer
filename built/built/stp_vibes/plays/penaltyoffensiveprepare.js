define(["require", "exports", "base/world", "base/vector", "stp_vibes/skills/moveto"], function (require, exports, World, vector_1, moveto_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyOffensivePrepare = void 0;
    class PenaltyOffensivePrepare {
        constructor() {
        }
        run() {
            amun.log("Ball:" + World.Ball.pos);
            const robot = World.FriendlyRobotsById[1];
            amun.log(World.FriendlyRobots);
            new moveto_1.MoveTo(robot).run(new vector_1.Vector(0.0, 4.0), 0);
        }
    }
    exports.PenaltyOffensivePrepare = PenaltyOffensivePrepare;
});
//# sourceMappingURL=penaltyoffensiveprepare.js.map