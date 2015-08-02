/// <reference path="basic.ts"/>

module UDAPI {
    export interface Weapon {
        name: string;
        accuracy: number; // Percent, 0-100.
        damage: number;
    }

    export interface Attack extends TargetedAction {
        weapons: Weapon[];
        // It is an error to set this to a weapon not in the `weapons` list.
        weapon: Weapon;
    }
} 
