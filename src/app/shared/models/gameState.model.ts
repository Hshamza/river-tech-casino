
import { Game } from "../client/game.model";

export interface GameStateModel {
		allGames : Game[];
		trendingGames: Game[];
		isGamesLoaded: boolean;
		selectedGame: Game;
		lastPlayedGames: Game[];
}