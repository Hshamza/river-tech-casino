/* eslint-disable prettier/prettier */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CasinoGamesComponent } from "./casino-games.component";
import { CasinoGameComponent } from "./casino-game/casino-game.component";

const routes: Routes = [
	{
		path: "",
		component: CasinoGamesComponent,
	},
	{
		path: ":slug",
		component: CasinoGameComponent
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CasinoGameRoutingModule { }
