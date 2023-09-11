import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: any): Promise<boolean> {
    try {
      const userHasEmail = await this.userService.findByEmail(value);

      return !userHasEmail;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }

      throw error;
    }
  }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: EmailValidator,
    });
  };
};
