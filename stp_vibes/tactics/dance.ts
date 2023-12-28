import {FriendlyRobot} from "../../base/robot";
import {MoveTo} from "../skills/moveto";
import {Vector} from "../../base/vector";

export class Dance {
    private robots : FriendlyRobot[];

    constructor(robots : FriendlyRobot[]) {
        this.robots = robots;
    }

    public run() {
        this.robots.forEach((value, index, array) => {
            const skill = new MoveTo(value);

            const y = Math.sin(index / this.robots.length * Math.PI * 2);
            const x = Math.cos(index / this.robots.length * Math.PI * 2);

            skill.run(new Vector(x, y), 0);
        })
    }
}