import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { LoginDto } from './dto/login.dto'
import { Model } from 'mongoose'
import { User } from 'src/users/Schema/Users'
import * as bcrypt from 'bcryptjs'
import { CustomRequest } from 'src/common/response'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async login({ username, password }: LoginDto) {
    const existing = await this.userModel.findOne({ username })
    if (!existing) {
      throw new UnauthorizedException('Username yoki parol xato')
    }

    const valid = bcrypt.compareSync(password, existing.password)
    if (!valid) {
      throw new UnauthorizedException('Username yoki parol xato')
    }

    const token = this.jwtService.sign({
      user: { id: existing._id },
    })
    return { msg: 'Muvaffaqqiyatli kirdingiz!', token, data: existing }
  }
 
}
