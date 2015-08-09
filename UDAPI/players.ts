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
		const profileIDMatcher = /profile.cgi\?id=(\d+)/;
		const contactChecker = /con(\d)/;

		export class Actor implements UDAPI.Actor {
			public state: PlayerState = PlayerState.Unknown;
			public special: SpecialActor = SpecialActor.None;
			public contact: Contact = Contact.No;

			public name: string;
			public ID: UDID;

			public profileURL(): string {
				return `/profile.cgi?id=${this.ID}`;
			}

			public static FromPlayerLink(link: JQuery): Actor {
				let name = link.text();
				// Extract the ID from the profile URL
				let matchData = link.attr('href').match(profileIDMatcher);
				if (!matchData) {
					throw new Error("Passed JQuery element is not a link to a player!");
				}
				let ID = parseInt(matchData[1], 10);
				if (!ID) {
					throw new Error("Passed JQuery element is not a valid link to a player!");
				}
				// Create our actor
				var ret = new Actor(name, ID);
				// Basic use case check for anonymous zombie
				if (name === "A zombie") {
					ret.special = SpecialActor.AnonymousZombie;
					ret.state = PlayerState.Undead;
				}
				// Check for contact classes
				let contactCheck = link.get(0).className.match(contactChecker);
				if (contactCheck) {
					ret.contact = Contact[contactCheck[1]];
				}
				// Potentially useful not but not really doable with this system:
				// Class detector. f1 = military, f2 = scientist, f3 = civilian.

				return ret;
			}

			constructor(name: string, ID: UDID) {
				this.name = name;
				this.ID = ID;
			}

		}
	
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
