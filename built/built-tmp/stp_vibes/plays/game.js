define(["require", "exports", "base/world", "stp_vibes/tactics/dance", "stp_vibes/plays/penaltyoffensiveprepare", "stp_vibes/plays/penaltydefenseprepare", "stp_vibes/plays/penaltyoffense"], function (require, exports, World, dance_1, penaltyoffensiveprepare_1, penaltydefenseprepare_1, penaltyoffense_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = exports.currentGameState = exports.locked = exports.GameState = void 0;
    let dance;
    var GameState;
    (function (GameState) {
        GameState[GameState["NULL"] = 0] = "NULL";
        GameState[GameState["BPrep"] = 1] = "BPrep";
        GameState[GameState["YPrep"] = 2] = "YPrep";
        GameState[GameState["BShoot"] = 3] = "BShoot";
        GameState[GameState["YShoot"] = 4] = "YShoot";
        GameState[GameState["BEnd"] = 5] = "BEnd";
        GameState[GameState["YEnd"] = 6] = "YEnd";
        GameState[GameState["Dance"] = 7] = "Dance";
    })(GameState = exports.GameState || (exports.GameState = {}));
    exports.locked = false;
    exports.currentGameState = GameState.Dance;
    class Game {
        constructor() {
        }
        run() {
            switch (exports.currentGameState) {
                case GameState.BPrep: {
                    exports.locked = true;
                    if (World.TeamIsBlue) {
                        new penaltyoffensiveprepare_1.PenaltyOffensivePrepare().run();
                    }
                    else {
                        new penaltydefenseprepare_1.PenaltyDefensePrepare().run();
                    }
                    break;
                }
                case GameState.YPrep: {
                    exports.locked = true;
                    if (World.TeamIsBlue) {
                        new penaltydefenseprepare_1.PenaltyDefensePrepare().run();
                    }
                    else {
                        new penaltyoffensiveprepare_1.PenaltyOffensivePrepare().run();
                    }
                    break;
                }
                case GameState.BShoot: {
                    if (World.TeamIsBlue) {
                        new penaltyoffense_1.PenaltyOffense().run();
                    }
                    else {
                    }
                    break;
                }
                case GameState.YShoot: {
                    amun.log("YSHOOT");
                    break;
                }
                case GameState.Dance: {
                    new dance_1.Dance(World.FriendlyRobots).run();
                }
            }
        }
    }
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map