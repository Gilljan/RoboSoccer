define(["require", "exports", "stp_vibes/skills/moveto", "base/vector"], function (require, exports, moveto_1, vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dance = void 0;
    let count = 0;
    class Dance {
        constructor(robots) {
            this.robots = robots;
        }
        run() {
            const centerX = 0;
            const centerY = 0;
            this.robots.forEach((value, index, array) => {
                const skill = new moveto_1.MoveTo(value);
                const angle = (index / this.robots.length) * 2 * Math.PI;
                const radius = 1;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                const orientation = count * (index / this.robots.length) * 360;
                skill.run(new vector_1.Vector(x, y), orientation);
            });
            count++;
        }
    }
    exports.Dance = Dance;
});
//# sourceMappingURL=dance.js.map