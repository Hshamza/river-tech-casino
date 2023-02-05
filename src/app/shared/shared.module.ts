import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GameComponent } from "../shared/components/game/game.component";
import { NoImageDirective } from "../shared/directives/no-image.directive";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextComponent } from "./components/input-text/input-text.component";
import { MultiDropdownComponent } from "./components/multi-dropdown/multi-dropdown.component";
import { MatSelectModule } from "@angular/material/select";


@NgModule({
	imports: [
		CommonModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		MatSelectModule,
	],
	declarations: [
		GameComponent,
		NoImageDirective,
		InputTextComponent,
		MultiDropdownComponent
	],
	exports: [
		GameComponent,
		MatInputModule,
		NoImageDirective,
		InputTextComponent,
		MultiDropdownComponent,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class SharedModule {

}
