import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, Subscription, combineLatest } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { GamesActions } from "src/app/store/actions/game-action";
import { GameStates } from "src/app/store/states/game-state";
import { Game } from "src/app/shared";
import { FormControl } from "@angular/forms";
import { debounceTime, startWith, map, distinctUntilChanged } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-casino-games",
	templateUrl: "./casino-games.component.html",
	styleUrls: ["./casino-games.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class CasinoGamesComponent implements OnInit, OnDestroy {
	allGamesList: Game[] = [];
	allFilteredGamesList: Game[] = [];
	providersList: String[] = [];
	searchGameForm = new FormControl("");
	providerGameForm = new FormControl();
	allSubscriptions: Subscription = new Subscription();
	searchGameText: string = "";
	selectedProviderList: String[] = [];

	@Select(GameStates.getAllGames) gamesData$!: Observable<Game[]>;
	@Select(GameStates.getLoadedState) isGamesLoaded$!: Observable<boolean>;

	constructor(private _store: Store,
		private _activatedRoute: ActivatedRoute,
		private _location: Location) {
		this.allSubscriptions.add(this.isGamesLoaded$.subscribe((res: boolean) => {
			if (!res) {
				this._store.dispatch(new GamesActions.GetGames());
			}
		})
		);
	}


	ngOnInit(): void {
		this.allSubscriptions.add(this.gamesData$.subscribe((gameData: Game[]) => {
			this.allGamesList = gameData;
			this.allFilteredGamesList = gameData;
			this.providersList = this.getProviders();
			this.getAppliedFilters();
		})
		);
		this.manageSearchFilters();

	}


	/**
	 * Check in URL if there are any filters to apply
	 * @returns
	 */
	getAppliedFilters() {
		const { searchTerm, provider } = this._activatedRoute.snapshot.queryParams;
		if (!searchTerm && !provider) { return; }
		if (searchTerm) {
			this.searchGameForm.setValue(searchTerm);
		}
		if (provider) {
			if (Array.isArray(provider)) {
				this.selectedProviderList = provider;
				this.providerGameForm.setValue(provider);
			} else {
				this.selectedProviderList.push(provider);
				this.providerGameForm.setValue([provider]);
			}
		}

		if (searchTerm || provider) {
			this.allFilteredGamesList = this.filterOutGames();
		}
	}

	trackGame(index: number, item: Game) {
		return item.id;
	}

	onClearSearch() {
		this.searchGameForm.setValue("");
	}

	getProviders() {
		const providers = [... new Set(this.allGamesList.map((game: Game) =>
				game?.providerName ? game.providerName : "" )
			)];
		return providers;
	}


	/**
	 * Subscribe the Search fillers
	 */
	manageSearchFilters() {
		this.allSubscriptions.add(
			this.searchGameForm.valueChanges.pipe(
				debounceTime(500),
				startWith(null),
				distinctUntilChanged(),
				map(() => {
					this.addToQueryParams();
					return this.filterOutGames();
				})
			)
				.subscribe((response: Game[]) =>
					this.allFilteredGamesList = response
				)
		);

		this.allSubscriptions.add(
			this.providerGameForm.valueChanges
				.pipe(
					debounceTime(200),
					startWith(null),
					distinctUntilChanged(),

					map(() => {
						this.addToQueryParams();
						return this.filterOutGames();
					})
				)
				.subscribe((res : Game[]) =>
					this.allFilteredGamesList = res
				)
		);
	}

	/**
	 * Remove invalid or null params from the URL
	 * @param params
	 * @returns
	 */
	removeInvalidQueryParams(params: any) {
		for (const propName in params) {
			if (params[propName] === null || params[propName] === undefined) {
				delete params[propName];
			}
		}
		return params;
	}

	/**
	 * Add filters to query params in the url
	 */
	addToQueryParams() {
		let queryParamObj = {
			searchTerm: this.searchGameForm?.value || null,
			provider: this.providerGameForm?.value || null,
		};

		queryParamObj = this.removeInvalidQueryParams(queryParamObj);
		const params = new HttpParams().appendAll(queryParamObj);
		this._location.replaceState(location.pathname, params.toString());
	}

	/**
	 * Filter out the games on given filtes and search
	 * @returns
	 */
	filterOutGames() {
		if (!this.searchGameForm.value && !this.providerGameForm) { return []; }

		if (this.searchGameForm.value === null && this.providerGameForm?.value?.length === 0) { return this.allGamesList; }
		return this.allGamesList.filter((game: Game) => {
			if (this.providerGameForm?.value?.length !== 0) {
				return (game.title?.toLowerCase().includes(this.searchGameForm?.value?.toLowerCase() || "")
					&& this.providerGameForm?.value?.includes(game.providerName));
			} else {
				return game.title?.toLowerCase().includes(this.searchGameForm?.value?.toLowerCase() || "");
			}
		});
	}

	ngOnDestroy(): void {
		this.allSubscriptions?.unsubscribe();
	}
}
