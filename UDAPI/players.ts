/// <reference path="basic.ts" />
/// <reference path="items.ts" />

module UDAPI {
	export enum PlayerClass {
		Civilian = 0,
		Scientist,
		Military,
		Zombie
	}

	export interface Player extends Actor {
		hitPoints?: number; // null if player cannot see HP (dark, missing skill etc)
		// TODO: Do zombies see injuries? What does an injured and infected survivor look like?
		injured: boolean; // If player HP is marked in red
		infected: boolean;
	}

	// TODO: Break out into own file with large amounts of enum fuckery
	export interface Clothing {
		state: string;
		colour: string;
		item: string;
	}

	export interface SkillNode {
		name: string;
		description: string;
		subSkills: SkillNode[];
	}
	export interface SkillsTree {
		human: SkillNode[];
		zombie: SkillNode[];
	}

	export interface ExtendedPlayer extends Player {
		experience: number;
		class: PlayerClass;
		joined: string;
		description: string;
		clothes: string[];
		skills: SkillsTree;

		parseClothing: () => Clothing[];
	}

	export interface CurrentPlayer extends Player {
		actionPoints: number;
		experience: number;
		inventory: Item[];
		safeHouse?: Directions; // Null if no safehouse set
	}

	export module Internal {
		/*
		 * Note to self re parsing skills:
		 * Every skill has its own <ul> tag. This includes subskills
		 * I'm counting this as a bug, since they show up even when the skills themselves aren't there.
		 * The best way to parse this in a sustainable way that I can think of is via jQuery:
		 * thing.children('ul').children('li')
		 * Thing can be either td.slam[rowspan="10"] or a skill with subskills.
		 * Calling children twice both with selectors ensures that no matter how much other crap
		 *  is in the dom (and how many uls are involved), you end up with nothing but the lis
		 *  that contain skills that are inside `thing`. Ideally I'd prefer to avoid jQuery but :/
		 */
	}
}
