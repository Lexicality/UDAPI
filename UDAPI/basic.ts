module UDAPI {
    export enum PlayerState {
        Unknown = 0,
        Alive,
        Dead,
        Undead,
        Reviving
    }
    export enum SpecialActor {
        None = 0,
        AnonymousZombie,
        Barricades,
        Generator,
        RadioMast,
        RadioTransmission,
        Decoration,
        Building,
        You
    }
    export enum Contact {
        No = 0,
        // TODO: Colours!
    }

    // Uncomment when resharper 9.1 happens
    // export type UDID = number;

    export interface Actor {
        state: PlayerState;
        name: string;
        ID: number;//UDID;
        special: SpecialActor;

        profileURL(): string;
    }

    export interface ActionData {
        url: string;
        data: any;
    }

    export interface Action {
        name: string;
        apCost: number;

        performAction(): ActionData;
    }

    export interface TargetedAction extends Action {
        targets: Actor[];
        // It is an error to set this to an actor not in the `targets` list.
        target: Actor;
    }

    export interface Coordinates {
        x: number;
        y: number;
    }

    export enum Direction {
        Here = 0,
        North, // -
        East,  // +
        South, // +
        West   // -
    }

    export interface RawDirections {
        first: number;
        firstDirection: Direction;
        second: number;
        secondDirection: Direction;
    }

    // For safehouse, groans etc
    export interface Directions {
        raw: RawDirections;
        // With negative X being North and negative Y being west.
        relative: Coordinates;
        // Works out where directions point based on `from`
        destination(from: Coordinates): Coordinates;
    }

    // Special cases. All 0,0 directions will be a reference to one of these three variables.
    export var here: Directions;    // Where the player is
    export var inside: Directions;  // The same block as the player, but inside the building they are outside
    export var outside: Directions; // The same block as the player, but outside the building they are inside

    /*
     * ######################
     *    STILL LEFT TO DO
     * ######################
     * 
     * - History lines
     * - Zombie instincts
     * - Buy skills page data
     * - Settings page data
     * - Contacts page data
     * - Graphiti data
     * - Location type (is hosptial/fire station etc.)
     * - Holiday items. How many of them are visible on the exterior? Is this part of the building description? Do we need to parse this? Christmas lights in minimap.
     * - Minimap square types
     * - Clothes?
     * 
     */ 
}