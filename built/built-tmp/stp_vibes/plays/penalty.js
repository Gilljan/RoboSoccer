define(["require", "exports", "base/world", "base/vector", "stp_vibes/skills/moveto"], function (require, exports, World, vector_1, moveto_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Penalty = void 0;
    class Penalty {
        constructor() {
        }
        run() {
            const robot = World.FriendlyRobotsById[2];
            const play = new moveto_1.MoveTo(robot);
            play.run(new vector_1.Vector(0.0, 2.0), 0);
        }
    }
    exports.Penalty = Penalty;
});
//# sourceMappingURL=penalty.js.map