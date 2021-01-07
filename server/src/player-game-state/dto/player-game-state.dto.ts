import { InventoryStateDto } from "./inventory-state.dto";

export class PlayerGameStateDto {
    readonly player_id: string
    readonly inventory: InventoryStateDto
}