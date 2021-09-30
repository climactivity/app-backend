import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

// mongo db support
import { MongooseModule } from '@nestjs/mongoose';

import { InfobyteModule } from './infobyte/infobyte.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { TreeTemplateModule } from './tree-template/tree-template.module';
import { HeartbeatService } from './heartbeat/heartbeat.service';
import { ChronoModule } from './chrono/chrono.module';
import { HeartbeatModule } from './heartbeat/heartbeat.module';
import { PlayerGameStateModule } from './player-game-state/player-game-state.module';
import { AspectModule } from './aspect/aspect.module';
import { RewardsModule } from './rewards/rewards.module';
import { ClientCacheModule } from './client-cache/client-cache.module';
import { AppController } from './app.controller';
import { QuestModule } from './quest/quest.module';
import { SharingModule } from './sharing/sharing.module';
import { AdminconfigModule } from './adminconfig/adminconfig.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration]
    }), MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        let config = { uri: "" }; 
        if (configService.get("db_user")) {
          config.uri =  `mongodb://${configService.get("db_user")}:${configService.get("db_pass")}@${configService.get("db_uri")}:${configService.get("db_port")}/${configService.get("db_name")}`
        } else {
          config.uri =  `mongodb://mongouser:password@${configService.get("db_uri")}:${configService.get("db_port")}/${configService.get("db_name")}`
        }
        return config;
      },inject: [ConfigService]
    }),
    //MongooseModule.forRoot('mongodb://localhost/nest'),
    InfobyteModule,
    ImageUploadModule,
    TreeTemplateModule,
    ChronoModule,
    HeartbeatModule,
    PlayerGameStateModule,
    AspectModule,
    RewardsModule,
    ClientCacheModule,
    QuestModule,
    SharingModule,
    AdminconfigModule,
    ],
  providers: [],
})
export class AppModule {}
