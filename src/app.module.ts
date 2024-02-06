import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlowModule } from './flow/flow.module';
import config from './common/config';

@Module({
  imports: [
    MongooseModule.forRoot(`${config.db.host}/${config.db.name}`),
    FlowModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
