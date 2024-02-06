import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateFlowDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  serie: string

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  level: number
  
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  avg_level: number
}
