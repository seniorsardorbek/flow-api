import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcryptjs'
import { Model } from 'mongoose'
import { User } from './Schema/Users'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ParamIdDto, QueryDto } from 'src/common/query.dto'
import { PaginationResponse } from 'src/common/response'
const saltOrRounds = 12
@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private userModel: Model<User>) {}
  async create (data: CreateUserDto) {
    try {
      const username = await this.userModel.findOne({ username: data.username })
      if (username) {
        throw new BadRequestException({
          msg: 'Username allqachon foydalanilgan',
        })
      }
      data.password = await bcrypt.hash(data.password, saltOrRounds)
      return this.userModel.create(data)
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..."  , error})
    }
  }

  async findAll ({ page, q }: QueryDto): Promise<PaginationResponse<User>> {
    try {
      const { limit = 10, offset = 0 } = page || {}
      const total = await this.userModel.find().countDocuments()
      const data = await this.userModel
        .find()
        .limit(limit)
        .skip(limit * offset)
      return { data, limit, offset, total }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  findOne ({ id }: ParamIdDto) {
    try {
      const user = this.userModel.findById(id)
      return user
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  async update ({ id }: ParamIdDto, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10)
      }
      const updated = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        {
          new: true,
        },
      )
      if (!updated) {
        throw new BadRequestException({ msg: 'Foydalanuvchi mavjud emas.' })
      } else {
        return { msg: 'Muvaffaqqiyatli yangilandi.' }
      }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }

  async remove ({ id }: ParamIdDto) {
    try {
      const removed = await this.userModel.findByIdAndDelete(id)
      if (!removed) {
        throw new BadRequestException({ msg: 'Foydalanuvchi mavjud emas.' })
      } else {
        return { msg: "Muvaffaqqiyatli o'chirildi." }
      }
    } catch (error) {
      throw new BadRequestException({ msg: "Keyinroq urinib ko'ring..." })
    }
  }
}
