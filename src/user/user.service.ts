import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { ListUserDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: CreateUserDTO) {
    const userEntity = new UserEntity();

    Object.assign(userEntity, userData as UserEntity);

    return this.userRepository.save(userEntity);
  }

  async listUser() {
    const savedUsers = await this.userRepository.find();
    const listUsers = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.name),
    );
    return listUsers;
  }

  async findByEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado!');

    return checkEmail;
  }

  async updateUser(id: string, newData: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id });

    if (user === null) {
      throw new NotFoundException('O usuário não foi encontrado!');
    }

    Object.assign(user, newData as UserEntity);

    return this.userRepository.save(user);
  }

  async removeUser(id: string) {
    const result = await this.userRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('O usuário não foi encontrado!');
    }
  }
}
