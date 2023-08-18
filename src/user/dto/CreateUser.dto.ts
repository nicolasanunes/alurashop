import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validation/email.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  @EmailIsUnique({ message: 'Já existe um usuário com este e-mail!' })
  email: string;

  @MinLength(6, { message: 'A senha precisa conter pelo menos 6 caracteres!' })
  password: string;
}
