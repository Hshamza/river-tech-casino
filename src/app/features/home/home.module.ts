import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./../home/home.component";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeRoutingModule } from "./home.routing.module";

@NgModule({
	imports: [
		CommonModule,
		HomeRoutingModule,
		SharedModule,
	],
	declarations: [
		HomeComponent
	],
	exports: [
	]
})
export class HomeModule {

}
