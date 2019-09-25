import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    require('./websocket').init(await app.listen(5000, '0.0.0.0',
    () => {new Logger('EasyPost').log(`ExServer http://localhost:5000 to see`); }));
}

bootstrap();