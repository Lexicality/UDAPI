/// <reference path="basic.ts"/>

module UDAPI {
    export enum EventType {
        Unknown = 0,
        // In alphabetical order. Use F9 in sublime text to maintain.
        Attack,
        DestroyArtifact, // Decoratoin, Generator, Radiomast.
        DumpBody,
        Flare,
        Groan,
        InfectionDamage,
        InfectionDeath,
        Kill,
        LightsOn,
        LightsOut,
        RadioBroadcast,
        RadioDestroyed, // Radio message for destruction
        RadioRecieve,
        Ransack,
        RefuelGenerator,
        RetuneRadio, // Pocket radio
        RetuneRadioMast,
        Rise,
        Ruin,
        Speech,

        // TODO
    }

    // TODO: Do things such as deaths & rises have

    export enum GroanIntensity {
        None = 0,
        // TODO
    }

    export interface Event {
        eventType: EventType;
        rawHTML: string; // In case message is not of known type, try parsing it yourself!
        actors: Actor[]; // People or things mentioned in the message, in order.
        time: string; // "2 days ago", "yesterday", "1 hour and 24 minutes ago"
        // Things that are in different events. Possibly this should be a shitton of sub-events with casting involved?
        creak?: boolean; // null if attack is not against barricades. Indicates oil levels.
        damage?: number; // null if no damage
        damageSuccess?: boolean; // For events that do not have damage numbers.
        direction?: Direction; // null if no direction indicated.
        groanIntensity?: GroanIntensity; // null if not a groan event
        message?: string; // "hello world" TODO: Radio messages sometimes have static in them - this is not part of the message.
        tool?: string; // "fire axe", "pumpkin" etc. null if event does not use tool
    }
}
