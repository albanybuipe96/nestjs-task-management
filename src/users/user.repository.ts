import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { EntityRepository, Repository } from "typeorm";
import { UserCedentialDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(createUserDto: UserCedentialDto): Promise<void> {
        const { username, password } = createUserDto
        const user = new User()
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)
        await this.insert(user)
            .catch(err => {
                if (err.code === 11000) {
                    throw new ConflictException('Username already taken')
                } else {
                    throw new InternalServerErrorException()
                }
            })
    }

    async validateUserPassword(userCedentialDto: UserCedentialDto): Promise<string> {
        const { username, password } = userCedentialDto
        const user = await this.findOne({ username })
        if (user && await user.validatePassword(password)) {
            return user.username
        } else {
            return null
        }
    }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt)
    }

}