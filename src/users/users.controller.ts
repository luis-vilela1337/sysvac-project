import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/middleware/auth';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { UsersService } from './users.service';

@ApiTags('User Routes')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthMiddleware)
  @Post()
  create(@Req() request: any, @Body() createUserDTO: CreateUserDTO) {
    const userLogged = request.user.id;

    return this.userService.create(createUserDTO, userLogged);
  }

  @ApiBearerAuth()
  @Post(':id')
  @UseGuards(AuthMiddleware)
  findOne(@Req() request: any, @Body() findUserDTO: FindUserDTO) {
    const userLogged = request.user.id;
    return this.userService.findOne(userLogged, findUserDTO);
  }
}
