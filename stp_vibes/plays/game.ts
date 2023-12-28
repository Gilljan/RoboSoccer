import * as World from "base/world";
import {Vector} from "base/vector";
import {MoveTo} from "stp_vibes/skills/moveto";

export class Game {

	constructor() {

	}

	run() {
    		//amun.log("Game Play loop");
    		amun.log(World.Ball.pos);
    		
    		let a = 0;
    		World.FriendlyRobots.forEach((robot, index, robots) => {
    			const play = new MoveTo(robot);
    			
    			//play.run(new Vector(0,0), 0);
    			
    			const y = Math.sin(a / World.FriendlyRobots.length * Math.PI * 2);
    			const x = Math.cos(a / World.FriendlyRobots.length * Math.PI * 2);
    			play.run(new Vector(Math.floor(Math.random()) * 2,Math.floor(Math.random() * 2)), 0);
    			a++;
    		});
	}
}
