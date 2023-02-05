import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { Game } from "src/app/shared";
import { GamesActions } from "src/app/store/actions/game-action";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.scss"]
})
export class GameComponent {

	@Input() game!: Game;
	@Input() showButton: boolean = false;
	@Input() isFooterGames: boolean = false;

	constructor(public _router: Router, private _store: Store) { }

	redirectToGame(slug: string) {
		this._router.navigateByUrl(`games/${slug}`);
	}

	playButton(url: string) {
		window.open(url);
		this._store.dispatch(new GamesActions.SetLastPlayedGame(this.game));
	}

}
