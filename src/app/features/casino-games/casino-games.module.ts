import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CasinoGameComponent } from "./casino-game/casino-game.component";
import { CasinoGamesComponent } from "./casino-games.component";
import { CasinoGameRoutingModule } from "./casino-games.routing.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	imports: [
		CommonModule,
		CasinoGameRoutingModule,
		SharedModule,
	],
	declarations: [
		CasinoGameComponent,
		CasinoGamesComponent,
	],
	exports: [
	]
})
export class CasinoGameModule {

}
