import * as World from "base/world";
import { Game } from "stp_vibes/plays/game";
import { Halt } from "stp_vibes/plays/halt";
import { PenaltyOffensivePrepare } from "stp_vibes/plays/penaltyoffensiveprepare";
import {PenaltyDefensePrepare} from "stp_vibes/plays/penaltydefenseprepare";
import {GameState} from "stp_vibes/plays/game";
//import { Play } from "stp_vibes/plays/playstub"

let currentPlay = new Game(GameState.NULL);

function redecide_play(): boolean {
	// Decide if you want to change your current play
	return true
}

export function main() {
	if (redecide_play()) {
		switch (World.RefereeState) {
			// Decide on play based on referee and world state
			case "Game":{
				currentPlay = new Game(GameState.Dance);
				break;
			}		
			case "Halt": {
				currentPlay = new Halt();
				break;
			}
			case "PenaltyOffensivePrepare": {
				//currentPlay = new PenaltyOffensivePrepare();
				break;
			}
			case "PenaltyDefensivePrepare": {
				//currentPlay = new PenaltyDefensePrepare();
				break;
			}
		}
	}
	currentPlay.run();
}
