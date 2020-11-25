import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserCedentialDto } from './dto/create-user.dto'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}
    
    async getUsers(): Promise<User[]> {
        const users = await this.userRepository.find()
        return users
    }

    getUserById(id: string): Promise<User> {
        return this.userRepository.findOne(id)
    }

    createUser(createUserDto: UserCedentialDto): Promise<void> {
        return this.userRepository.createUser(createUserDto)
    }

    async deleteUSer(id: string): Promise<void> {
        await this.userRepository.delete(id)
    }

    async updateUserName(id: string, name: string) {
        this.userRepository.update(id, { username: name })
    }

    async signIn(userCedentialDto: UserCedentialDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(userCedentialDto)
        if (!username) {
            throw new UnauthorizedException('Invalid username or password')
        }

        const payload: JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload)
        return { accessToken }
    }

}
