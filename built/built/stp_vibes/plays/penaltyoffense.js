define(["require", "exports", "base/world", "stp_vibes/skills/shootto", "stp_vibes/plays/game", "base/vector"], function (require, exports, World, shootto_1, Game, vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyOffense = void 0;
    let count = 0;
    let random = generateRandomNumber(-1.1, 1.1, 4);
    class PenaltyOffense {
        constructor() {
            if (Game.shoots > count) {
                count++;
                random = generateRandomNumber(-1.1, 1.1, 4);
            }
        }
        run() {
            const robot = World.FriendlyRobotsById[(Game.shoots % 5) + 1];
            new shootto_1.ShootTo(robot, new vector_1.Vector(random, 6.1), false).run();
        }
    }
    exports.PenaltyOffense = PenaltyOffense;
    function generateRandomNumber(min, max, decimalPlaces) {
        if (min > max || decimalPlaces < 0) {
            throw new Error("Ungýltige Eingabeparameter");
        }
        const range = max - min;
        let randomNumber = Math.random() * range + min;
        randomNumber = parseFloat(randomNumber.toFixed(decimalPlaces));
        return randomNumber;
    }
});
//# sourceMappingURL=penaltyoffense.js.map