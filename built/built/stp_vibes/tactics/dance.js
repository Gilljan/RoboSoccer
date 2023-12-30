define(["require", "exports", "stp_vibes/skills/moveto", "base/vector"], function (require, exports, moveto_1, vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dance = void 0;
    let centerX = 0;
    let centerY = 0;
    let count = 0;
    var DancePhase;
    (function (DancePhase) {
        DancePhase[DancePhase["Circle"] = 0] = "Circle";
        DancePhase[DancePhase["CircleGrowing"] = 1] = "CircleGrowing";
        DancePhase[DancePhase["ReverseCircle"] = 2] = "ReverseCircle";
    })(DancePhase || (DancePhase = {}));
    let currentPhase = DancePhase.Circle;
    class Dance {
        constructor(robots) {
            this.robots = robots;
        }
        run() {
            switch (currentPhase) {
                case DancePhase.Circle: {
                    this.robots.forEach((value, index, array) => {
                        const skill = new moveto_1.MoveTo(value);
                        if (this.moveKeeper(value, index)) {
                            return;
                        }
                        const vec = this.calcRotatedPos(index, false);
                        const orientation = count * (index / this.robots.length) * 360;
                        skill.run(vec, 0);
                    });
                    break;
                }
                case DancePhase.ReverseCircle: {
                    this.robots.forEach((value, index, array) => {
                        const skill = new moveto_1.MoveTo(value);
                        if (this.moveKeeper(value, index)) {
                            return;
                        }
                        const vec = this.calcRotatedPos(index, true);
                        const orientation = count * (index / this.robots.length) * 360;
                        skill.run(vec, 0);
                    });
                }
            }
            count++;
            if (count >= this.getPhaseLength(currentPhase)) {
                currentPhase = Object.keys(DancePhase)[(currentPhase + 1) % 3] | undefined;
                amun.log(currentPhase);
                count = 0;
            }
        }
        moveKeeper(robot, index) {
            if (index == 0) {
                new moveto_1.MoveTo(robot).run(new vector_1.Vector(0.0, 4.0), 0);
                return true;
            }
            return false;
        }
        calcRotatedPos(index, reverse) {
            const angle = ((index + (reverse ? -count : count) / 500) / this.robots.length) * 2 * Math.PI;
            const radius = 2 + Math.cos(count / 500);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return new vector_1.Vector(x, y);
        }
        getPhaseLength(phase) {
            switch (phase) {
                case DancePhase.Circle: return 1000;
                case DancePhase.CircleGrowing: return 2000;
                case DancePhase.ReverseCircle: return 1000;
            }
        }
    }
    exports.Dance = Dance;
});
//# sourceMappingURL=dance.js.map