import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

// mongo db support
import { MongooseModule } from '@nestjs/mongoose';

import { InfobyteModule } from './infobyte/infobyte.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { TreeTemplateModule } from './tree-template/tree-template.module';
import { HeartbeatGateway } from './heartbeat.gateway';
import { HeartbeatService } from './heartbeat/heartbeat.service';
import { ChronoService } from './chrono/chrono.service';
import { ChronoModule } from './chrono/chrono.module';

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
          config.uri =  `mongodb://${configService.get("db_uri")}:${configService.get("db_port")}/${configService.get("db_name")}`
        }
        return config;
      },inject: [ConfigService]
    }),
    //MongooseModule.forRoot('mongodb://localhost/nest'),
    InfobyteModule,
    ImageUploadModule,
    TreeTemplateModule,
    ChronoModule,
    ],
  controllers: [],
  providers: [HeartbeatGateway, HeartbeatService],
})
export class AppModule {}
