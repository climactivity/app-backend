import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// serve the frontend -- should probably done by nginx, but this is fine for testing
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// mongo db support
import { MongooseModule } from '@nestjs/mongoose';


import { InfobyteModule } from './infobyte/infobyte.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    InfobyteModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'site/public'),
      exclude: ['/infobyte*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
