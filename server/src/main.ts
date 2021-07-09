import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import configuration from './config/configuration';
import { WsAdapter } from '@nestjs/platform-ws';
import * as bodyParser from 'body-parser'; 
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  if (configuration().use_static_assets) {
    app.useStaticAssets(join(__dirname, '../..', 'site/public'));
    app.useStaticAssets(join(__dirname, '../..', 'site/public'), {prefix: '/admin/'});

  }
  app.enableCors({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: "Origin, Content-Type, Accept",
    maxAge: 1728000
  });
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.useWebSocketAdapter(new WsAdapter(app))
  await app.listen(3000);
}
bootstrap();
