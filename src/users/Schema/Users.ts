import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: false,
  },
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  fullname: string
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string
  @Prop({
    type: String,
    required: true,
  })
  password: string

}
export const UserSchema = SchemaFactory.createForClass(User)

