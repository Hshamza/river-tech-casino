import { Game } from "src/app/shared";

export namespace GamesActions {

		export class GetGames {
				static readonly type = "[Game Page] Get Games";
		}

		export class SetSelectedGame {
				static readonly type = "[Game Page] Set Selected Game";
				constructor(public slug: string) { }
		}

		export class SetLastPlayedGame {
			static readonly type = "[Game Page] Set Last Played Game";
			constructor(public game: Game) { }
		}
}