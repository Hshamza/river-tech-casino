import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { GameStates } from "src/app/store/states/game-state";
import { Select, Store } from "@ngxs/store";
import { ActivatedRoute, Params } from "@angular/router";
import { GamesActions } from "src/app/store/actions/game-action";
import { Game } from "src/app/shared";


@Component({
	selector: "app-casino-game",
	templateUrl: "./casino-game.component.html",
})
export class CasinoGameComponent implements OnInit, OnDestroy {

	selectedGame!: Game;
	allSubscriptions: Subscription = new Subscription();

	@Select(GameStates.getLoadedState) isGamesLoaded$!: Observable<boolean>;
	@Select(GameStates.getSelectedGame) getSelectedGame$!: Observable<Game>;

	constructor(private _activatedRoute: ActivatedRoute,
		private _store: Store) {
		this._activatedRoute.paramMap.subscribe((param: Params) => {
			const slug = param.get("slug") || "";
			this.getSelectedGame(slug);
		});
	}


	ngOnInit(): void {
		this.allSubscriptions.add(this.getSelectedGame$.subscribe((res: Game) => {
			if (res) {
				this.selectedGame = res;
			}
		}));
	}

	/**
	 * get selected game form state/api
	 * @param slug
	 */
	getSelectedGame(slug: string) {
		this.allSubscriptions.add(this.isGamesLoaded$.subscribe((res: boolean) => {
			if (!res) {
				this._store.dispatch(new GamesActions.GetGames);
				this._store.dispatch(new GamesActions.SetSelectedGame(slug));
			} else {
				this._store.dispatch(new GamesActions.SetSelectedGame(slug));
			}
		}));
	}


	ngOnDestroy(): void {
		this.allSubscriptions?.unsubscribe();
	}
}
