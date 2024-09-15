import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Users from 'src/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly users_Repository: Repository<Users>
    ) {}
    findAll = async () => {
        return await this.users_Repository.find()
    }
}
