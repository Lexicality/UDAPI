/// <reference path="basic.ts"/>
/// <reference path="players.ts"/>
/// <reference path="violence.ts"/>

module UDAPI {
    export enum Barricades {
        None = 0,
        Loosely,
        Lightly,
        QuiteStrongly,
        VeryStrongly,
        ExtremelyStrongly
    }

    export enum Damage {
        None = 0,
        Dented,
        Battered,
        Damage,
        BadlyDamaged
    }

    export enum FuelState {
        Empty = 0,
        Low,
        Full
    }

    export interface Artifact {
        name: string; // Generator
        damage: Damage;
    }

    export interface Generator extends Artifact {
        fuel: FuelState;
    }

    export interface RadioMast extends Artifact {
        frequency: string; // 25.52
    }

    export enum Doors {
        None = 0,
        Open,
        Closed
    }

    export interface LocationZombies {
        count: number;
        fromHorde: number;
        contacts: Actor[];
    }

    export interface LocationCorpses {
        count: number;
        reviving: number;
        contacts: Actor[];
    }

    export interface InputAction extends Action {
        input: string;
    }

    export interface LocationActions {
        clickActions: Action[];
        inputActions: InputAction[];
        attack?: Attack; // null if no attack available
    }

    export interface SprayData {
        // TODO: Custom descriptions such as "A rotating billboard is stuck halfway between two posters. Somebody has spraypainted %s across it."
        // TODO: Gore: "Somebody has spraypainted @N@ @*r*i#%*d *#s#r @ @K%% j#h@ * h*w##* onto a tree. The graffiti has been obscured by smears of gore." (Gore is highlighted red)
        text: string; // "cades at VSB++"
        location: string; // "a wall", "the departures board", "a tree"
        // possibly?
        format: string; // "Somebody has spraypainted %s onto a tree". Maybe? Useful for client
        goreMask: string; // eg "ynynyynynyyynnyynynnynynyynnynynynnynyyy" for "@N@ @*r*i#%*d *#s#r @ @K%% j#h@ * h*w##*"
    }

    export interface Location {
        name: string;
        description: string;
        isSafehouse: boolean;
        isNecrotech: boolean;
        lit: boolean;
        dark: boolean; // clubs, cinema etc
        ruined: boolean;
        doorStatus: Doors;
        barricadeStatus: Barricades;
        humans?: Player[]; // null if no players in location
        zombies?: LocationZombies; // null if no zombies in location
        corpses?: LocationCorpses; // null if no corpses in location
        actions?: LocationActions; // null if no actions available
        spraypaint?: SprayData; // null if no spraypaint
        // interior
        generator?: Generator; // null if no generator
        radioMast?: RadioMast; // null if no radio mast
        decorations: string[];
        // exterior
        phoneMast: boolean; // meaningless inside.
        // TODO: Christmas lights, trees, pumpkins.
    }

    export enum NodeType {
        Unknown = 0
        // hospital, park etc. TODO
    }

    export interface MapNode {
        name: string;
        type: NodeType;
        humans?: Actor[]; // Null if no humans at node.
        coords: Coordinates; // Will be inferred for central node
        more: boolean; // Indicates the '...'
        zombies: number;
    }

    export interface MiniMap {
        Current: MapNode;
        // Directions can be null if at map edges
        NW?: MapNode;
        N?: MapNode;
        NE?: MapNode;
        E?: MapNode;
        SE?: MapNode;
        S?: MapNode;
        SW?: MapNode;
        W?: MapNode;
    }
}
