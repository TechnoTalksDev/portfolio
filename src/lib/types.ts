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

export interface StudioPhoto {
	name: string;
	img: string;
	description: string;
	location?: string;
	date: string;
	shotOn: string;
	featuring?: string[];
	honors?: string[];
}

export interface StudioVideo {
	name: string;
	img: string;
	link: string;
	description: string;
	date: string;
	shotOn: string;
	featuring?: string[];
	honors?: string[];
}
