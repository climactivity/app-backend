const GAME_CONSTANTS_VERSION_KEY = "version";
const GAME_CONSTANTS_VERSION = 1

export type GameConstants = {
    [GAME_CONSTANTS_VERSION_KEY]: {v:number};
    ui : {
        "3dClicKAcceptanceRadius": number, 
        "2dClicKAcceptanceRadius": number,
    }; 
    tracking : {
        "TrackingPeriodsShort": [number,number,number,number], 
        "TrackingPeriodsLong": [number,number,number,number]
    }; 
    gamelogic: {
		"InfoCompletionWeight": number,
		"TrackingCompletionWeight": number,
		"QuestCompletionWeight": number,
		"TrackingTypeWeight": number
	},
    events?: {
        "eventMessages": EventMessage[]
    }
};

export type EventMessage = {
    eventKey: string,
    region: string[], 
    language: string[],
    notifyFrom: Date,
    notifyTill: Date,
    pushAt?: Date[],
    retarget: boolean,
    message: string
}


