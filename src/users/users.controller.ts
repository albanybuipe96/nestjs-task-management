import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UserCedentialDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers()
    }

    @Get('/:id')
    getUserById(@Param('id') id: string): Promise<User> {
        return this.usersService.getUserById(id)
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) userCredentialDto: UserCedentialDto): Promise<void> {
        return this.usersService.createUser(userCredentialDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) userCredentialDto: UserCedentialDto): Promise<{ accessToken: string; }> {
        return this.usersService.signIn(userCredentialDto)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUSer(id)
    }

    @Patch('/:id/update')
    updateUserName(@Param('id') id: string, @Body('name') name: string) {
        this.usersService.updateUserName(id, name)
    }

}
