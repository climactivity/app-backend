import { Injectable } from '@nestjs/common';
import { HeartbeatDto } from './dto/Heartbeat.dto';

@Injectable()
export class HeartbeatService {

    handleMessage(clientData) {
        switch(clientData.type) {
            case "connect": {
               return this.checkVersion(clientData);
            }
        }
    }

    checkVersion(data: HeartbeatDto) {
        return {
            serverVersion: "0.1.0",
            clientSupported: (data.version === "v=0.1.0")
        }
    }

}
