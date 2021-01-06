import { Module } from '@nestjs/common';
import { ChronoModule } from 'src/chrono/chrono.module';
import { HeartbeatGateway } from './heartbeat.gateway';
import { HeartbeatService } from './heartbeat.service';

@Module({
    imports: [
        ChronoModule
    ],
    providers: [
        HeartbeatGateway,
        HeartbeatService
    ],
    exports: [
        HeartbeatGateway
    ]
})
export class HeartbeatModule {}
