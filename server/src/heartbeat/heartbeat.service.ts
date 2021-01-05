import { Injectable } from '@nestjs/common';
import { HeartbeatDto } from './dto/Heartbeat.dto';

@Injectable()
export class HeartbeatService {

    checkVersion(data: HeartbeatDto) {
        console.log(data)
        return (data.version === "v=0.1.0");
    }

}
