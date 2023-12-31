define(["require", "exports", "base/world", "stp_vibes/tactics/dance", "stp_vibes/plays/penaltyoffensiveprepare", "stp_vibes/plays/penaltydefenseprepare", "stp_vibes/plays/penaltyoffense", "stp_vibes/plays/penaltyend", "stp_vibes/plays/penaltydefense", "stp_vibes/plays/startformation"], function (require, exports, World, dance_1, PenaltyOffensivePrepare, penaltydefenseprepare_1, penaltyoffense_1, penaltyend_1, penaltydefense_1, startformation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = exports.counter = exports.shoots = exports.currentGameState = exports.GameState = void 0;
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
    exports.currentGameState = GameState.NULL;
    exports.shoots = 0;
    exports.counter = 0;
    class Game {
        constructor() {
        }
        run() {
            if (exports.shoots >= 10) {
                exports.counter++;
                if (exports.counter == 300) {
                    exports.currentGameState = GameState.Dance;
                }
            }
            switch (exports.currentGameState) {
                case GameState.NULL: {
                    new startformation_1.StartFormation().run();
                    break;
                }
                case GameState.BPrep: {
                    if (World.TeamIsBlue) {
                        new PenaltyOffensivePrepare.PenaltyOffensivePrepare().run();
                    }
                    else {
                        new penaltydefenseprepare_1.PenaltyDefensePrepare().run();
                    }
                    break;
                }
                case GameState.YPrep: {
                    if (World.TeamIsBlue) {
                        new penaltydefenseprepare_1.PenaltyDefensePrepare().run();
                    }
                    else {
                        new PenaltyOffensivePrepare.PenaltyOffensivePrepare().run();
                    }
                    break;
                }
                case GameState.BShoot: {
                    if (World.TeamIsBlue) {
                        new penaltyoffense_1.PenaltyOffense().run();
                    }
                    else {
                        new penaltydefense_1.PenaltyDefense().run();
                    }
                    break;
                }
                case GameState.YShoot: {
                    if (!World.TeamIsBlue) {
                        new penaltyoffense_1.PenaltyOffense().run();
                    }
                    else {
                        new penaltydefense_1.PenaltyDefense().run();
                    }
                    break;
                }
                case GameState.BEnd: {
                    new penaltyend_1.PenaltyEnd().run(!World.TeamIsBlue);
                    break;
                }
                case GameState.YEnd: {
                    new penaltyend_1.PenaltyEnd().run(World.TeamIsBlue);
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