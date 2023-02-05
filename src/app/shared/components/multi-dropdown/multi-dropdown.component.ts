import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";

@Component({
	selector: "app-multi-dropdown",
	templateUrl: "./multi-dropdown.component.html",
	styleUrls: ["./multi-dropdown.component.scss"]
})
export class MultiDropdownComponent {

	@Input() options: String[] = [];
	@Input() selectedOptions: String[] = [];
	@Input() control!: FormControl;
	@Input() isShowResetBtn : boolean = false;
	@Input() label : string = "";
	@ViewChild("matMultiRef") matMultiRef!: MatSelect;

	/**
	 * Clear selected filter options
	 */
	clearFilters() {
		this.matMultiRef.options.forEach((data: MatOption) => data.deselect());
	}
}
