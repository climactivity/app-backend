import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardEntityDto } from './dto/create-board-entity.dto';
import { InventoryStateDto } from './dto/inventory-state.dto';
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
                installs: [install_id],
                cyNetworkAccount: null
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
        const playerGameState = await this.getPlayerStateForInstallId(install_id);
        if(playerGameState == null) return "NO_PLAYER_RECORD"
        let boardEntity = await new this.BoardEntityModel({...createBoardEntityDto}).save()
        playerGameState.boardState.entities.push(boardEntity)
        return this.playerGameStateToBoardStateDto((await playerGameState.save()).boardState)
    }
    async findInventoryForDevice(install_id: any): Promise<InventoryStateDto|string> {
        const playerGameState = await this.getPlayerStateForInstallId(install_id);
        if(playerGameState == null) return "NO_PLAYER_RECORD"
        return this.inventoryToDto(playerGameState.inventory) 
    }
    async findBoardStateForDevice(install_id: any): Promise<PlayerBoardStateDto|string> {
        const playerGameState = await this.getPlayerStateForInstallId(install_id);
        if(playerGameState == null) return "NO_PLAYER_RECORD"
        return this.playerGameStateToBoardStateDto(playerGameState.boardState) 
    }

    async findPlayerStateByInstallId(install_id: string): Promise<PlayerGameStateDto|string> {
        const playerGameState = await this.getPlayerStateForInstallId(install_id);
        if(playerGameState == null) return "NO_PLAYER_RECORD"
        return this.playerGameStateToDto(playerGameState);
    }

    async getPlayerForInstallId(install_id: string) {
       return  this.PlayerInstallsModel.findOne( { installs: install_id} ).exec();
    }

    async getPlayerStateForInstallId(install_id: string) {
        const playerId : PlayerInstalls = await this.getPlayerForInstallId(install_id); 
        if(!playerId) return null
        return this.PlayerGameStateModel.findOne({playerInstalls: playerId}).exec();

    }

    playerGameStateToBoardStateDto(boardState) {
        return boardState
    }

    playerGameStateToDto(playerGameState) {
        return {
            player_id: playerGameState.playerInstalls._id,
            cyNetworkAccount: playerGameState.playerInstalls.cyNetworkAccount,
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
