import { Injectable } from '@nestjs/common';
import { CreateBoardEntityDto } from './dto/create-board-entity.dto';
import { PlayerGameStateDto } from './dto/player-game-state.dto';

@Injectable()
export class PlayerGameStateService {
    createBoardEntityForDevice(install_id: any, createBoardEntityDto: CreateBoardEntityDto) {
        throw new Error('Method not implemented.');
    }
    findInventoryForDevice(install_id: any): Promise<import("./dto/player-board-state.dto").PlayerBoardStateDto> {
        throw new Error('Method not implemented.');
    }
    findBoardStateForDevice(install_id: any): Promise<import("./dto/player-board-state.dto").PlayerBoardStateDto> {
        throw new Error('Method not implemented.');
    }
    findPlayerStateByInstallId(install_id: string): Promise<PlayerGameStateDto|string> {
        throw new Error('Method not implemented.');
    }
}
