import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validation/email.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  @EmailIsUnique({ message: 'Já existe um usuário com este e-mail!' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa conter pelo menos 6 caracteres!' })
  @IsOptional()
  password: string;
}
