import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { Game } from "src/app/shared";
import { GameStates } from "src/app/store/states/game-state";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.component.html",
	styleUrls: ["./footer.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {

	@Select(GameStates.getLastPlayedGames) gamesData$!: Observable<Game[]>;
	lastPlayedGames: Game[] = [];

	constructor(private cdr: ChangeDetectorRef) { }

	ngOnInit(): void {
		this.getLastPlayedGames();
	}

	/**
		*	Get	the	Last	Played	Games	from	state
		*/
	getLastPlayedGames() {
		this.gamesData$.subscribe((games: Game[]) => {
			this.lastPlayedGames = games;
			this.cdr.detectChanges();

		});
	}

	trackGame(index: number, item: Game) {
		return item.id;
	}
}
