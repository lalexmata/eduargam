import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dtos/user.dto';

export class RegisterAuthDtos extends PartialType(CreateUserDto){}
