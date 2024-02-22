import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateFlowDto } from './dto/create-flow.dto'
import { UpdateFlowDto } from './dto/update-flow.dto'
import { InjectModel, MongooseModule } from '@nestjs/mongoose'
import { Flow } from './Schema/Flow'
import { Model } from 'mongoose'
import { QueryDto } from 'src/common/query.dto'
import { PaginationResponse } from 'src/common/response'

@Injectable()
export class FlowService {
  constructor (
    @InjectModel(Flow.name) private readonly flowModel: Model<Flow>,
  ) {}
  create (createFlowDto: CreateFlowDto) {
    try {
      return this.flowModel.create(createFlowDto)
    } catch (error) {
      console.log(error)
    }
  }

  async findAll ({ page }: QueryDto): Promise<PaginationResponse<Flow>> {
    try {
      const { limit = 10, offset = 0 } = page || {}
      const total = await this.flowModel.find().countDocuments()
      const data = await this.flowModel
        .find().sort({created_at : -1})
        .limit(limit)
        .skip(limit * offset)
      return { data, limit, offset, total }
    } catch (error) {
      throw new BadRequestException({
        msg: "Keyinroq urinib ko'ring...",
        error,
      })
    }
  }

  findOne (id: number) {
    return `This action returns a #${id} flow`
  }

  update (id: number, updateFlowDto: UpdateFlowDto) {
    return `This action updates a #${id} flow`
  }

  remove (id: number) {
    return `This action removes a #${id} flow`
  }
}
