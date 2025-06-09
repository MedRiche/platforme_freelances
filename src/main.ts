import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Caster en NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(passport.initialize());

  app.useStaticAssets(join(__dirname, '..', 'frontend'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
