import {FriendlyRobot} from "../../base/robot";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Vector} from "base/vector";

let centerX: number = 0;
let centerY: number = 0;

let count: number = 0;

enum DancePhase {
    Circle,
    CircleGrowing,
    ReverseCircle,
    CircleUneven
}

//let phases : DancePhase[] = {Circle, CircleGrowing, ReverseCircle};

let currentPhase = DancePhase.Circle;

export class Dance {
    private robots: FriendlyRobot[];

    constructor(robots: FriendlyRobot[]) {
        this.robots = robots;
    }

    public run() {
        switch (currentPhase) {
            case DancePhase.Circle: {
                this.robots.forEach((value, index, array) => {
                    const skill = new MoveTo(value);

                    if (this.moveKeeper(value, index)) {
                        return;
                    }

                    const vec = this.calcRotatedPos(index, false, (_) => 2);

                    // Use the count variable to control the rotation
                    const orientation = count * (index / this.robots.length) * 360;

                    skill.run(vec, 0);
                });
                break;
            }
            case DancePhase.CircleGrowing: {
                this.robots.forEach((value, index, array) => {
                    const skill = new MoveTo(value);

                    if (this.moveKeeper(value, index)) {
                        return;
                    }

                    const vec = this.calcRotatedPos(index, false, (_) => 2 + Math.cos(count / 500));

                    // Use the count variable to control the rotation
                    const orientation = count * (index / this.robots.length) * 360;

                    skill.run(vec, 0);
                });
                break;
            }
            case DancePhase.ReverseCircle: {
                this.robots.forEach((value, index, array) => {
                    const skill = new MoveTo(value);

                    if (this.moveKeeper(value, index)) {
                        return;
                    }

                    const vec = this.calcRotatedPos(index, true, (_) => 2);

                    // Use the count variable to control the rotation
                    const orientation = count * (index / this.robots.length) * 360;

                    skill.run(vec, 0);
                });
            }
            case DancePhase.CircleUneven: {
                this.robots.forEach((value, index, array) => {
                    const skill = new MoveTo(value);

                    if (this.moveKeeper(value, index)) {
                        return;
                    }

                    const vec = this.calcRotatedPos(index, false, (index) => index % 2 == 0 ? 2 : 2 + Math.cos(count / 500));

                    // Use the count variable to control the rotation
                    const orientation = count * (index / this.robots.length) * 360;

                    skill.run(vec, 0);
                });
                break;
            }
        }

        count++;

        if (count >= this.getPhaseLength(currentPhase)) {
            currentPhase = Object.keys(DancePhase)[(currentPhase + 1) % 3] | undefined;

            amun.log(currentPhase);

            count = 0;
        }
    }

    moveKeeper(robot: FriendlyRobot, index: number): boolean {
        if (index == 0) {
            new MoveTo(robot).run(new Vector(0.0, 4.0), 0);

            return true;
        }

        return false;
    }

    calcRotatedPos(index: number, reverse: boolean, radius: (index: number) => number): Vector {
        // Calculate the position in a circle around the center
        const angle = ((index + (reverse ? -count : count) / 500) / this.robots.length) * 2 * Math.PI;

        const x = centerX + radius(index) * Math.cos(angle);
        const y = centerY + radius(index) * Math.sin(angle);

        return new Vector(x, y);
    }

    getPhaseLength(phase: DancePhase): number {
        switch (phase) {
            case DancePhase.Circle:
                return 1000;
            case DancePhase.CircleGrowing:
                return 2000;
            case DancePhase.ReverseCircle:
                return 1000;
            case DancePhase.CircleUneven:
                return 2000;
        }
    }
}
