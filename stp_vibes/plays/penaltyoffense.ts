import * as World from "base/world";
import {ShootTo} from "stp_vibes/skills/shootto";
import * as Game from "stp_vibes/plays/game";
import {Vector} from "base/vector";

let count: number = 0;
let random: number = generateRandomNumber(-1.1, 1.1, 4);

export class PenaltyOffense {

    constructor() {
        if (Game.shoots > count) {
            count++;

            random = generateRandomNumber(-1.1, 1.1, 4);
        }
    }

    run() {
        const robot = World.FriendlyRobotsById[(Game.shoots % 5)+1];

        new ShootTo(robot, new Vector(random, 6.1), false).run();
    }
}

function generateRandomNumber(min: number, max: number, decimalPlaces: number): number {
    // Überprüfe, ob die Eingabeparameter gültig sind
    if (min > max || decimalPlaces < 0) {
        throw new Error("Ungültige Eingabeparameter");
    }

    // Berechne den Zufallsbereich
    const range = max - min;

    // Generiere eine Zufallszahl im Bereich
    let randomNumber = Math.random() * range + min;

    // Begrenze die Anzahl der Dezimalstellen
    randomNumber = parseFloat(randomNumber.toFixed(decimalPlaces));

//amun.log(randomNumber);
    return randomNumber;
}

