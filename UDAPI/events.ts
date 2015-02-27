/// <reference path="basic.ts"/> 

module UDAPI {
    export enum EventType {
        Unknown = 0,
        // TODO
    }

    export interface Event {
        eventType: EventType;
        rawText: string;
        tool?: string; // "fire axe", "pumpkin" etc. null if event does not use tool
        actors: Actor[];
    }
}