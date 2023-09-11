import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ListUserDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const createdUser = await this.userService.createUser(userData);

    return {
      user: new ListUserDTO(createdUser.id, createdUser.name),
      message: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listUser() {
    const savedUsers = await this.userService.listUser();
    return savedUsers;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userService.updateUser(id, newData);
    return {
      user: updatedUser,
      message: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.userService.removeUser(id);

    return {
      user: removedUser,
      message: 'Usuário removido com sucesso!',
    };
  }
}
