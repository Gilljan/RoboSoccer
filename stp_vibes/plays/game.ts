import * as World from "base/world";
import {Vector} from "base/vector";
import {MoveTo} from "stp_vibes/skills/moveto";
import {Dance} from "stp_vibes/tactics/dance";
import * as PenaltyOffensivePrepare from "stp_vibes/plays/penaltyoffensiveprepare";
import {PenaltyDefensePrepare} from "stp_vibes/plays/penaltydefenseprepare";
import {PenaltyOffense} from "stp_vibes/plays/penaltyoffense";
import {PenaltyEnd} from "stp_vibes/plays/penaltyend";
import {PenaltyDefense} from "stp_vibes/plays/penaltydefense";

let dance: Dance;

export enum GameState {
    NULL,
    BPrep,
    YPrep,
    BShoot,
    YShoot,
    BEnd,
    YEnd,
    Dance
}

export let locked: boolean = false;
export let currentGameState: GameState = GameState.BPrep;
export let shoots: number = 0;//has to be 10 in the end

export class Game {

    constructor() {
        //currentGameState = startWith;
        //dance = new Dance(World.FriendlyRobots);
    }

    run() {
        //dance.run();
        if (!World.TeamIsBlue) {

            //amun.log("GS: " + currentGameState);
        }
        switch (currentGameState) {
            case GameState.BPrep: {
                //amun.log("executed");
                locked = true;

                if (World.TeamIsBlue) {
                    //(PenaltyOffensivePrepare.currentGameState as any) = PenaltyOffensivePrepare.GameState.GetBall;
                    new PenaltyOffensivePrepare.PenaltyOffensivePrepare().run();
                } else {
                    new PenaltyDefensePrepare().run();
                }
                break;
            }
            case GameState.YPrep: {
                locked = true;

                if (World.TeamIsBlue) {
                    new PenaltyDefensePrepare().run();
                } else {
                    //(PenaltyOffensivePrepare.currentGameState as any) = PenaltyOffensivePrepare.GameState.GetBall;
                    new PenaltyOffensivePrepare.PenaltyOffensivePrepare().run();
                }

                break;

            }
            case GameState.BShoot: {
                //amun.log("BSHOOT");

                if (World.TeamIsBlue) {
                    new PenaltyOffense().run();
                } else {
                    new PenaltyDefense().run();
                }
                break;
            }
            case GameState.YShoot: {
                if (!World.TeamIsBlue) {
                    new PenaltyOffense().run();
                } else {
                    new PenaltyDefense().run();
                }
                break;
            }
            case GameState.BEnd: {
                new PenaltyEnd().run(!World.TeamIsBlue);
                break;
            }
            case GameState.YEnd: {
                new PenaltyEnd().run(World.TeamIsBlue);
                break;
            }
            case GameState.Dance: {
                new Dance(World.FriendlyRobots).run();
            }
        }
    }


}
