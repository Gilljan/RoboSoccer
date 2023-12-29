import {FriendlyRobot} from "../../base/robot";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Vector} from "base/vector";


let count : number = 0;

export class Dance {
    private robots : FriendlyRobot[];

    constructor(robots : FriendlyRobot[]) {
        this.robots = robots;
        
    }

    public run() {
    const centerX = 0; // Set the X-coordinate of the center
    const centerY = 0; // Set the Y-coordinate of the center

    this.robots.forEach((value, index, array) => {
        const skill = new MoveTo(value);

        // Calculate the position in a circle around the center
        const angle = (index / this.robots.length) * 2 * Math.PI;
        const radius = 1; // You can adjust the radius as needed

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Use the count variable to control the rotation
        const orientation = count * (index / this.robots.length) * 360; // Assuming degrees, adjust if using radians

        skill.run(new Vector(x, y), orientation);
    });

    count++;
}

}
