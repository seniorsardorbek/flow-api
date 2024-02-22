import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: false
  },
})
export class Flow {
  @Prop({
    type: String,
    required: true,
  })
  serie: string
  @Prop({
    type: String,
    required: true,
  })
  name: string
  @Prop({
    type: Number,
    required: true,
  })
  level: number
  @Prop({
    type: Number,
    required: true,
  })
  avg_level: number
  @Prop({ timestamps: true })
  created_at: Date;


}
export const FlowSchema = SchemaFactory.createForClass(Flow)
