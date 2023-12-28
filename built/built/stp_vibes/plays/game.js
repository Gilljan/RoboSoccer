define(["require", "exports", "base/world", "base/vector", "stp_vibes/skills/moveto"], function (require, exports, World, vector_1, moveto_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    class Game {
        constructor() {
        }
        run() {
            amun.log(World.Ball.pos);
            let a = 0;
            World.FriendlyRobots.forEach((robot, index, robots) => {
                const play = new moveto_1.MoveTo(robot);
                const y = Math.sin(a / World.FriendlyRobots.length * Math.PI * 2);
                const x = Math.cos(a / World.FriendlyRobots.length * Math.PI * 2);
                play.run(new vector_1.Vector(Math.floor(Math.random()) * 2, Math.floor(Math.random() * 2)), 0);
                a++;
            });
        }
    }
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map