define(["require", "exports", "base/world", "stp_vibes/skills/shootto", "base/vector"], function (require, exports, World, shootto_1, vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PenaltyOffense = void 0;
    class PenaltyOffense {
        constructor() {
        }
        run() {
            const robot = World.FriendlyRobotsById[1];
            const random = generateRandomNumber(-1.1, 1.1, 4);
            new shootto_1.ShootTo(robot, new vector_1.Vector(-1.0, 6.1), false).run();
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