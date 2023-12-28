define(["require", "exports", "base/world", "base/vector", "stp_vibes/skills/moveto"], function (require, exports, World, vector_1, moveto_1) {
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
        }
    }
    exports.PenaltyDefensePrepare = PenaltyDefensePrepare;
});
//# sourceMappingURL=penaltydefenseprepare.js.map