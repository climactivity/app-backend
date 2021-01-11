import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ChronoService } from './chrono.service';

@Module({  
    imports: [
        ScheduleModule.forRoot()
    ],
    providers: [ChronoService],
    exports: [ChronoService]})
export class ChronoModule {}
