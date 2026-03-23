export interface Skill {
	name: string;
	img: string;
	skill: number;
	link: string;
}

export interface Project {
	name: string;
	img: string;
	showcaseImgs?: string[];
	tagline?: string;
	shortDescription: string;
	longDescription?: string;
	link?: string;
	github?: string;
	tags: string[];
	skills: number[];
	active?: boolean;
}
