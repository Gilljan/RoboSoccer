define(["require", "exports", "stp_vibes/skills/moveto", "base/vector"], function (require, exports, moveto_1, vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dance = void 0;
    let count = 0;
    var DancePhase;
    (function (DancePhase) {
        DancePhase[DancePhase["Circle"] = 1000] = "Circle";
        DancePhase[DancePhase["CircleGrowing"] = 2000] = "CircleGrowing";
        DancePhase[DancePhase["ReverseCircle"] = 1000] = "ReverseCircle";
    })(DancePhase || (DancePhase = {}));
    let currentPhase = DancePhase.Circle;
    class Dance {
        constructor(robots) {
            this.robots = robots;
        }
        run() {
            switch (currentPhase) {
                case DancePhase.Circle: {
                    const centerX = 0;
                    const centerY = 0;
                    this.robots.forEach((value, index, array) => {
                        const skill = new moveto_1.MoveTo(value);
                        if (index == 0) {
                            skill.run(new vector_1.Vector(0.0, 4.0), 0);
                            return;
                        }
                        const angle = ((index + count / 500) / this.robots.length) * 2 * Math.PI;
                        const radius = 2 + Math.cos(count / 500);
                        const x = centerX + radius * Math.cos(angle);
                        const y = centerY + radius * Math.sin(angle);
                        const orientation = count * (index / this.robots.length) * 360;
                        skill.run(new vector_1.Vector(x, y), 0);
                    });
                    break;
                }
                case DancePhase.ReverseCircle: {
                    const centerX = 0;
                    const centerY = 0;
                    this.robots.forEach((value, index, array) => {
                        const skill = new moveto_1.MoveTo(value);
                        if (index == 0) {
                            skill.run(new vector_1.Vector(0.0, 4.0), 0);
                            return;
                        }
                        const angle = ((index + count / 500) / this.robots.length) * 2 * Math.PI;
                        const radius = 2 + Math.cos(count / 500);
                        const x = centerX + radius * Math.cos(angle);
                        const y = centerY + radius * Math.sin(angle);
                        const orientation = count * (index / this.robots.length) * 360;
                        skill.run(new vector_1.Vector(x, y), 0);
                    });
                }
            }
            count++;
            if (count >= currentPhase) {
                amun.log(Object.values(DancePhase));
                amun.log(Object.values(DancePhase).indexOf(currentPhase));
                amun.log(currentPhase);
                count = 0;
            }
        }
    }
    exports.Dance = Dance;
});
//# sourceMappingURL=dance.js.map