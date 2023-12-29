import {FriendlyRobot} from "../../base/robot";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Vector} from "base/vector";


let count: number = 0;

enum DancePhase {
    Circle = 1000,
    CircleGrowing = 2000,
    ReverseCircle = 1000
}

let currentPhase = DancePhase.Circle;

export class Dance {
    private robots: FriendlyRobot[];

    constructor(robots: FriendlyRobot[]) {
        this.robots = robots;
        //this.robots.shift();

    }

    public run() {

        switch (currentPhase) {
            case DancePhase.Circle: {
                const centerX = 0; // Set the X-coordinate of the center
                const centerY = 0; // Set the Y-coordinate of the center

                //amun.log(this.robots);

                this.robots.forEach((value, index, array) => {
                    const skill = new MoveTo(value);

                    if (index == 0) {
                        skill.run(new Vector(0.0, 4.0), 0);

                        return;
                    }


                    // Calculate the position in a circle around the center
                    const angle = ((index + count / 500) / this.robots.length) * 2 * Math.PI;
                    const radius = 2 + Math.cos(count / 500); // You can adjust the radius as needed

                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);

                    // Use the count variable to control the rotation
                    const orientation = count * (index / this.robots.length) * 360;

                    skill.run(new Vector(x, y), 0);
                });
                break;
            }
            case DancePhase.ReverseCircle: {
                const centerX = 0; // Set the X-coordinate of the center
                const centerY = 0; // Set the Y-coordinate of the center

                //amun.log(this.robots);

                this.robots.forEach((value, index, array) => {
                    const skill = new MoveTo(value);

                    if (index == 0) {
                        skill.run(new Vector(0.0, 4.0), 0);

                        return;
                    }


                    // Calculate the position in a circle around the center
                    const angle = ((index + count / 500) / this.robots.length) * 2 * Math.PI;
                    const radius = 2 + Math.cos(count / 500); // You can adjust the radius as needed

                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);

                    // Use the count variable to control the rotation
                    const orientation = count * (index / this.robots.length) * 360;

                    skill.run(new Vector(x, y), 0);
                });
            }
        }

        count++;

        if (count >= currentPhase) {
            amun.log(Object.values(DancePhase));
            amun.log(Object.values(DancePhase).indexOf(currentPhase));
            //currentPhase = Object.values(DancePhase)[Object.values(DancePhase).indexOf(currentPhase) + 1];

            amun.log(currentPhase);

            count = 0;
        }
    }
}
