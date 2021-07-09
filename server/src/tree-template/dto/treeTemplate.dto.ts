
export class TreeStateDto {
    readonly stage: number;
    readonly water: number;
    readonly water_needed: number;
    readonly bigpoint: string;
    readonly aspect: string
}

export class TreeTemplateDto {
	readonly template_name: string;
	readonly texture_name: string;
    readonly ui_name: string;
	readonly preview_name: number;
	readonly coin_value: number;
	readonly bigpoint_available: [string];
    readonly initial_state: TreeStateDto
    readonly archetype: string
}