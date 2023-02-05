import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
	selector: "[appNoImage]"
})
export class NoImageDirective {

	image: string = "../../../assets/images/No_Image_Available.jpg";

	constructor(private _elementRef: ElementRef, private _renderer: Renderer2 ) { }

	@HostListener("error")
	loadAlternateImage() {
		this._renderer.setAttribute(this._elementRef.nativeElement, "src", this.image);
	}

}
