define(["require", "exports", "base/world", "stp_vibes/skills/moveto", "base/vector"], function (require, exports, World, moveto_1, vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyDefense = void 0;
    let count = 0;
    let targetX = 0;
    class PenaltyDefense {
        constructor() {
        }
        run() {
            const robot = World.FriendlyRobotsById[0];
            const play = new moveto_1.MoveTo(robot);
            if (count % 50 == 0) {
                const min = 0;
                const max = 10;
                amun.log(vectorDistance(robot.pos, World.Ball.pos) < 2.0);
                if (vectorDistance(robot.pos, World.Ball.pos) < 3.0) {
                    targetX = World.Ball.pos.x;
                }
                else {
                    targetX = (Math.floor(Math.random() * (max - min + 1)) + min - 5) / 10;
                }
            }
            play.run(new vector_1.Vector(targetX, robot.pos.y), 0);
            count++;
        }
    }
    exports.PenaltyDefense = PenaltyDefense;
    function vectorDistance(vec1, vec2) {
        return Math.abs(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }
});
//# sourceMappingURL=penaltydefense.js.map