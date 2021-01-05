import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ChronoService  {

    private readonly logger = new Logger(ChronoService.name);

    private callbacks: Function[] = []

    register(callback: Function, ownerName: string) {
        this.callbacks.push(callback)
        this.logger.log(`Registered callback ${ownerName}.${callback.name}`)
    }

    @Cron('* * * * * *')
    handleCron() {
        this.callbacks.map(cb => cb())
    }

}
