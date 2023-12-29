define(["require", "exports", "base/world", "stp_vibes/plays/game", "stp_vibes/plays/halt", "stp_vibes/plays/game"], function (require, exports, World, game_1, halt_1, game_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    let currentPlay = new game_1.Game(game_2.GameState.NULL);
    function redecide_play() {
        return true;
    }
    function main() {
        if (redecide_play()) {
            switch (World.RefereeState) {
                case "Game": {
                    currentPlay = new game_1.Game(game_2.GameState.Dance);
                    break;
                }
                case "Halt": {
                    currentPlay = new halt_1.Halt();
                    break;
                }
                case "PenaltyOffensivePrepare": {
                    break;
                }
                case "PenaltyDefensivePrepare": {
                    break;
                }
            }
        }
        currentPlay.run();
    }
    exports.main = main;
});
//# sourceMappingURL=trainerstub.js.map