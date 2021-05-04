import { Body, Controller, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { CreateBoardEntityDto } from './dto/create-board-entity.dto';
import { PlayerBoardStateDto } from './dto/player-board-state.dto';
import { PlayerGameStateDto } from './dto/player-game-state.dto';
import { PlayerGameStateService } from './player-game-state.service';
import { InventoryStateDto } from './dto/inventory-state.dto';

@Controller('player-game-state')
export class PlayerGameStateController {
    private readonly logger = new Logger(PlayerGameStateController.name)
    constructor(private readonly playerGameStateService: PlayerGameStateService) {}

    @Post('/sync/:install_id')
    async syncPlayerState(@Param("install_id") install_id, @Body("player-state") player_state) {
        this.playerGameStateService.syncPlayerState(install_id, player_state)
        return {success: true}
    }

    @Get(":install_id")
    findExistingPlayerState(@Param('install_id') install_id): Promise<PlayerGameStateDto|string> {
        return this.playerGameStateService.findPlayerStateByInstallId(install_id)
    }

    // @Get(":install_id/board-state")
    // findBoardState(@Param('install_id') install_id): Promise<PlayerBoardStateDto|string> {
    //     return this.playerGameStateService.findBoardStateForDevice(install_id)
    // }

    // @Post(":install_id/create-player-state")
    // createNewPlayerState(@Param('install_id') install_id): Promise<PlayerGameStateDto|string> {
    //     return this.playerGameStateService.createNewPlayerStateForDevice(install_id)
    // }

    // @Get(":install_id/inventory")
    // findInventory(@Param('install_id') install_id): Promise<InventoryStateDto|string> {
    //     return this.playerGameStateService.findInventoryForDevice(install_id)
    // }

    // @Post(":install_id/board-state/entites")
    // createBoardEntity(@Param('install_id') install_id, @Body() createBoardEntityDto: CreateBoardEntityDto) {
    //     return this.playerGameStateService.createBoardEntityForDevice(install_id, createBoardEntityDto);
    // }

    // @Put(":install_id/board-state/entites/:entity_id")
    // updateBoardEntity(@Param('install_id') install_id,  @Param('entity_id') entity_id, @Body() updateBoardEntityDto: any) {
    //     return this.playerGameStateService.updateBoardEntityForDevice(install_id, entity_id, updateBoardEntityDto); 
    // }

    // @Get(":install_id/tracking/")
    // findTrackedAspectsFor(@Param('install_id') install_id) {
    //     return this.playerGameStateService.findTrackedAspectsForDevice(install_id);
    // }

    // @Get(":install_id/tracking/:aspect")
    // findTrackedAspectFor(@Param('install_id') install_id, @Param('aspect') aspect) {
    //     return this.playerGameStateService.findTrackedAspectForDevice(install_id, aspect);
    // }
    
    // @Post(":install_id/tracking/:aspect")
    // updateTracking(@Param('install_id') install_id, @Param('aspect') aspect, @Body() level) {
    //     return this.playerGameStateService.setTrackedAspectForDevice(install_id, aspect, level);
    // }


}
