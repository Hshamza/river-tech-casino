import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
	selector: "app-input-text",
	templateUrl: "./input-text.component.html",
})
export class InputTextComponent {

	@Input() label: string = "";
	@Input() control!: FormControl;

}
