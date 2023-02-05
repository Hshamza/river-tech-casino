export interface Game {
	id: number;
	slug: string;
	title: string;
	tag: string;
	providerName: string;
	startUrl: string;
	thumb?: Thumb;
	description? : any;
}

export interface Thumb {
	url: string;
	title: string;
}
