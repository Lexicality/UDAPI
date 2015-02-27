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
}