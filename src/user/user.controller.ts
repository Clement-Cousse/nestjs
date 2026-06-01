import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    const users = this.userService.findAll();
    return plainToInstance(UserDto, users)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(+id);
    return plainToInstance(UserDto, user)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.userService.update(+id, updateUserDto);
    return plainToInstance(UserDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const user = this.userService.remove(+id);
    return plainToInstance(UserDto, user)
  }
}
