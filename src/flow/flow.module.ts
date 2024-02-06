import { Module } from '@nestjs/common'
import { FlowService } from './flow.service'
import { FlowController } from './flow.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Flow, FlowSchema } from './Schema/Flow'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flow.name, schema: FlowSchema }]),
  ],
  controllers: [FlowController],
  providers: [FlowService],
})
export class FlowModule {}
