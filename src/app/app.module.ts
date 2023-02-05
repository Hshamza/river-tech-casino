import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./core/layout/header/header.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { SidebarComponent } from "./core/layout/sidebar/sidebar.component";

import { NgxsModule } from "@ngxs/store";
import { GameStates } from "./store/states/game-state";
import { environment } from "src/environments/environment";
import { SharedModule } from "./shared/shared.module";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { PageNotFoundComponent } from "./features/page-not-found/page-not-found.component";
import { ToastrModule } from "ngx-toastr";


const routes: Routes = [

	{
		path: "home",
		loadChildren: () => import("../app/features/home/home.module").then(m => m.HomeModule)

	},
	{
		path: "games",
		loadChildren: () =>
			import("../app/features/casino-games/casino-games.module").then(m => m.CasinoGameModule)
	},
	{
		path: "", redirectTo: "home", pathMatch: "full"
	},
	{
		path: "**", component: PageNotFoundComponent
	},

];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		SidebarComponent,
		PageNotFoundComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		BrowserModule,
		SharedModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(routes),
		NgxsModule.forRoot([GameStates], {
			developmentMode: !environment.production,
		}),
		NgxsStoragePluginModule.forRoot({
			key: "Games.lastPlayedGames"
		}),
		ToastrModule.forRoot({
			positionClass: "toast-top-center",
			preventDuplicates: true,
		}),

	],
	providers: [ToastrModule],
	bootstrap: [AppComponent]
})
export class AppModule { }
