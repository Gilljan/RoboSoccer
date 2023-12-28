import {FriendlyRobot} from "../../base/robot";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Vector} from "../../base/vector";

let count : number = 0;

export class Dance {
    private robots : FriendlyRobot[];

    constructor(robots : FriendlyRobot[]) {
        this.robots = robots;
    }

    public run() {
        this.robots.forEach((value, index, array) => {
            const skill = new MoveTo(value);

            const y = Math.sin(index / this.robots.length * Math.PI * count);
            const x = Math.cos(index / this.robots.length * Math.PI * count);

            skill.run(new Vector(x, y), 0);
        })

        count++;
    }
}