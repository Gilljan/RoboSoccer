define(["require", "exports", "base/world", "stp_vibes/plays/game", "stp_vibes/plays/halt", "stp_vibes/plays/penaltyoffensiveprepare", "stp_vibes/plays/penaltydefenseprepare"], function (require, exports, World, game_1, halt_1, penaltyoffensiveprepare_1, penaltydefenseprepare_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    let currentPlay = new game_1.Game();
    function redecide_play() {
        return true;
    }
    function main() {
        if (redecide_play()) {
            switch (World.RefereeState) {
                case "Game": {
                    currentPlay = new game_1.Game();
                    break;
                }
                case "Halt": {
                    currentPlay = new halt_1.Halt();
                    break;
                }
                case "PenaltyOffensivePrepare": {
                    currentPlay = new penaltyoffensiveprepare_1.PenaltyOffensivePrepare();
                    break;
                }
                case "PenaltyDefensivePrepare": {
                    currentPlay = new penaltydefenseprepare_1.PenaltyDefensePrepare();
                    break;
                }
            }
        }
        currentPlay.run();
    }
    exports.main = main;
});
//# sourceMappingURL=trainerstub.js.map