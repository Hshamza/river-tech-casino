import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { GameStates } from "../../store/states/game-state";
import { GamesActions } from "src/app/store/actions/game-action";
import { Game } from "../../shared";

@Component({
	templateUrl: "./home.component.html",
	styleUrls: ["./home.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
	gameList: Game[] = [];
	allSubscriptions: Subscription = new Subscription();
	@Select(GameStates.getTrendingGames) gamesData$!: Observable<Game[]>;
	@Select(GameStates.getLoadedState) isGamesLoaded$!: Observable<boolean>;

	constructor(public _store: Store, private cdr: ChangeDetectorRef ) {
		this.allSubscriptions.add(this.isGamesLoaded$.subscribe((res: boolean) => {
			if (!res) {
				this._store.dispatch(new GamesActions.GetGames());
			}
		}));
	}


	ngOnInit(): void {
		this.allSubscriptions.add(this.gamesData$.subscribe((gameData: Game[]) => {
			this.gameList = gameData;
			this.cdr.detectChanges();
		}));
	}

	trackGame(index: number, item: Game) {
		return item.id;
	}

	ngOnDestroy(): void {
		this.allSubscriptions?.unsubscribe();
	}
}

