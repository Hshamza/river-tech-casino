
import { Action, NgxsOnInit, Selector, Store, State, StateContext } from "@ngxs/store";
import { GameStateModel } from "src/app/shared/models/gameState.model";
import { Game } from "src/app/shared";
import { GamesActions } from "../actions/game-action";
import { Injectable } from "@angular/core";
import { GameMockClient } from "src/app/shared";
import { catchError, tap } from "rxjs/operators";
import { patch, removeItem } from "@ngxs/store/operators";
import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@State<GameStateModel>({
		name: "Games",
		defaults: {
				allGames: [],
				isGamesLoaded: false,
				trendingGames: [],
				selectedGame: {} as Game,
				lastPlayedGames: []
		},
})

@Injectable()
export class GameStates {
	constructor(private _store: Store,
		private _gameMockClient: GameMockClient,
		private _toast: ToastrService,
) { }

		@Selector()
		static getTrendingGames(state: GameStateModel) {
				return state.trendingGames;
		}


		@Selector()
		static getAllGames(state: GameStateModel) {
				return state.allGames;
		}

		@Selector()
		static getLoadedState(state: GameStateModel) {
				return state.isGamesLoaded;
		}

		@Selector()
		static getSelectedGame(state: GameStateModel) {
				return state.selectedGame;
		}

		@Selector()
		static getLastPlayedGames(state: GameStateModel) {
				return state.lastPlayedGames;
		}


		@Action(GamesActions.GetGames)
		getGames(context: StateContext<GameStateModel>) {
				return this._gameMockClient.getAll$().pipe(
						tap((response: Game[]) => {
								const state = context.getState();
								const trendingGames = response.filter((game: Game) =>
											game.tag === "trending"
								);

								context.setState({
										...state,
										allGames: response,
										isGamesLoaded: true,
										trendingGames
								});

						}
						),
						catchError(err => {
								this._toast.error("Something went wrong, Please check console logs for futher Information");
								return throwError(err?.message);
						})
				);
		}

		@Action(GamesActions.SetSelectedGame)
		setSelectedGame(context: StateContext<GameStateModel>, { slug }: GamesActions.SetSelectedGame) {
				const state = context.getState();
				const index = state.allGames.findIndex((game: Game) =>
						game.slug === slug
				);

				context.setState({
						...state,
						selectedGame: state.allGames[index]
				});
		}

		@Action(GamesActions.SetLastPlayedGame)
		SetLastPlayedGame(context: StateContext<GameStateModel>, { game }: GamesActions.SetLastPlayedGame) {
				let state = context.getState();
				let lastPlayedGames = state.lastPlayedGames;
				const index = lastPlayedGames.findIndex((lastgame: Game) =>
						lastgame.slug === game.slug
				);

				if (index === -1) {
						if (lastPlayedGames.length >= 5) {
								const toDeleteGame = lastPlayedGames.filter(res =>	res.id === lastPlayedGames[lastPlayedGames.length - 1].id)[0];
								context.setState(patch({
										lastPlayedGames: removeItem<Game>(stateGame => stateGame!.id === toDeleteGame.id)
								}));
						}

						state = context.getState();
						lastPlayedGames = state.lastPlayedGames;
						lastPlayedGames = [game, ...lastPlayedGames];

				} else {
						const recentGame = lastPlayedGames.filter(res => res.id === lastPlayedGames[index].id)[0];
						context.setState(patch({
								lastPlayedGames: removeItem<Game>(stateGame => stateGame!.id === recentGame.id)
						}));

						state = context.getState();
						lastPlayedGames = state.lastPlayedGames;
						lastPlayedGames = [game, ...lastPlayedGames];
				}

				context.setState({
						...state,
						lastPlayedGames
				});
		}
}