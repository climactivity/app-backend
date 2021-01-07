import { Body, Controller, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { CreateBoardEntityDto } from './dto/create-board-entity.dto';
import { PlayerBoardStateDto } from './dto/player-board-state.dto';
import { PlayerGameStateDto } from './dto/player-game-state.dto';
import { PlayerGameStateService } from './player-game-state.service';

@Controller('player-game-state')
export class PlayerGameStateController {
    private readonly logger = new Logger(PlayerGameStateController.name)
    constructor(private readonly playerGameStateService: PlayerGameStateService) {}

    @Get(":install_id")
    findExistingPlayerState(@Param('install_id') install_id): Promise<PlayerGameStateDto|string> {
        return this.playerGameStateService.findPlayerStateByInstallId(install_id)
    }

    @Get(":install_id/board-state")
    findBoardState(@Param('install_id') install_id): Promise<PlayerBoardStateDto> {
        return this.playerGameStateService.findBoardStateForDevice(install_id)
    }

    @Get(":install_id/inventory")
    findInventory(@Param('install_id') install_id): Promise<PlayerBoardStateDto> {
        return this.playerGameStateService.findInventoryForDevice(install_id)
    }

    @Post(":install_id/board-state/entites")
    createBoardEntity(@Param('install_id') install_id, @Body() createBoardEntityDto: CreateBoardEntityDto) {
        return this.playerGameStateService.createBoardEntityForDevice(install_id, createBoardEntityDto);
    }

    @Put(":install_id/board-state/entites/:entity_id")
    updateBoardEntity(@Param('install_id') install_id,  @Param('entity_id') entity_id, @Body() updateBoardEntityDto: any) {
        
    }
}
