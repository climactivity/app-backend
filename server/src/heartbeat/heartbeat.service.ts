import { Injectable } from '@nestjs/common';
import { HeartbeatDto } from './dto/Heartbeat.dto';
import { SyncGamestateDto } from './dto/SyncGamestate.dto';

@Injectable()
export class HeartbeatService {

    handleMessage(clientData) {
        switch(clientData.type) {
            case "connect": {
               return this.checkVersion(clientData);
            }
            case "sync_game_state": {
                return this.syncGamestate(clientData)
            }
        }
    }

    checkVersion(data: HeartbeatDto) {
        return {
            type: "greeting",
            serverVersion: "0.1.0",
            clientSupported: (data.version === "v=0.1.0")
        }
    }

    syncGamestate(data: SyncGamestateDto) {
        
    }
}
