import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardEntityDto } from './dto/create-board-entity.dto';
import { PlayerBoardStateDto } from './dto/player-board-state.dto';
import { PlayerGameStateDto } from './dto/player-game-state.dto';
import { BoardEntity, BoardEntityDocument } from './schema/board-entity.schema';
import { InventoryTransaction, InventoryTransactionDocument } from './schema/inventory-transaction.schema';
import { PlayerGameState, PlayerGameStateDocument } from './schema/player-game-state.schema';
import { PlayerInstalls, PlayerInstallsDocument } from './schema/player-installs';
import { PlayerInventory, PlayerInventoryDocument, PlayerInventorySchema } from './schema/player-inventory.schema';
import { TrackedAspects, TrackedAspectsDocument } from './schema/tracked-aspects.schema';

@Injectable()
export class PlayerGameStateService {

    private readonly logger = new Logger(PlayerGameStateService.name) 

    constructor(
        @InjectModel(BoardEntity.name) private BoardEntityModel: Model<BoardEntityDocument>,
        @InjectModel(InventoryTransaction.name) private InventoryTransactionModel: Model<InventoryTransactionDocument>,
        @InjectModel(PlayerGameState.name) private PlayerGameStateModel: Model<PlayerGameStateDocument>,
        @InjectModel(PlayerInventory.name) private PlayerInventoryModel: Model<PlayerInventoryDocument>,
        @InjectModel(TrackedAspects.name) private TrackedAspectsModel: Model<TrackedAspectsDocument>,
        @InjectModel(PlayerInstalls.name) private PlayerInstallsModel: Model<PlayerInstallsDocument>,
        ) {}

    async createNewPlayerStateForDevice(install_id: any): Promise<PlayerGameStateDto|string> {
        let playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(playerId) return this.findPlayerStateByInstallId(install_id)
        playerId = await new this.PlayerInstallsModel(
            {
                installs: [install_id]
            }).save()
        return this.playerGameStateToDto(await new this.PlayerGameStateModel({
            playerInstalls: playerId,
            inventory: await new this.PlayerInventoryModel({
                coins: 0, 
                xp: 0,
                level: 1,
            }).save(),
            boardState: {entities: []}
        }).save())
        
    }
    async setTrackedAspectForDevice(install_id: any, aspect: any, level: any) {
        const playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(!playerId) return "NO_PLAYER_RECORD"

        throw new Error('Method not implemented.');
    }
    async findTrackedAspectForDevice(install_id: any, aspect: any) {
        const playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(!playerId) return "NO_PLAYER_RECORD"

        throw new Error('Method not implemented.');
    }
    async findTrackedAspectsForDevice(install_id: any) {
        const playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(!playerId) return "NO_PLAYER_RECORD"

        if(!playerId) return "NO_PLAYER_RECORD"

        throw new Error('Method not implemented.');
    }
    async updateBoardEntityForDevice(install_id: any, entity_id: any, updateBoardEntityDto: any) {
        const playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(!playerId) return "NO_PLAYER_RECORD"

        throw new Error('Method not implemented.');
    }
    async createBoardEntityForDevice(install_id: any, createBoardEntityDto: CreateBoardEntityDto) {
     
        const playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(!playerId) return "NO_PLAYER_RECORD"

        throw new Error('Method not implemented.');
    }
    async findInventoryForDevice(install_id: any): Promise<PlayerBoardStateDto> {
        const playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(!playerId) return "NO_PLAYER_RECORD"

        throw new Error('Method not implemented.');
    }
    async findBoardStateForDevice(install_id: any): Promise<PlayerBoardStateDto> {
        const playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(!playerId) return "NO_PLAYER_RECORD"

        throw new Error('Method not implemented.');
    }

    async findPlayerStateByInstallId(install_id: string): Promise<PlayerGameStateDto|string> {
        const playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(!playerId) return "NO_PLAYER_RECORD"
        const playerGameState = await this.PlayerGameStateModel.findOne({playerInstalls: playerId}).exec();
        return this.playerGameStateToDto(playerGameState);
    }

    async getPlayerForInstallId(install_id: string) {
       return  this.PlayerInstallsModel.findOne( { installs: install_id} ).exec();
    }

    playerGameStateToDto(playerGameState) {
        return {
            player_id: playerGameState.playerInstalls._id,
            inventory: this.inventoryToDto(playerGameState.inventory)
        }
    }

    inventoryToDto(inventory: PlayerInventory) {
        return {
            coins: inventory.coins,
            xp: inventory.xp,
            level: inventory.level
        }
    }
}
