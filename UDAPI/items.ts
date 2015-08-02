/// <reference path="basic.ts" />

module UDAPI {
    export interface ItemAction {
        isTargeted: boolean;
        targetWord?: string; // on, to etc
        action: Action | TargetedAction;
        targetedAction?: TargetedAction;
    }

    export interface DropAction extends Action {
        items: Item[];
        // It is an error to set this to an item not in the `items` list.
        item: Item;
    }

    export interface Item {
        name: string;
        status: string; // IE radio frequency
        action: ItemAction;
    }

    export interface Inventory {
        items: Item[];
        encumberence: number; // 0-100
        dropAction?: DropAction; // Null if no inventory
    }
}
