import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from './current-user';
import { AuthUser } from './dto/auth-user';
import { LoginDto } from './dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { TokenDto } from './dto/access_token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = this.authService.register(body);
    return plainToInstance(UserDto, user)
  }
  

  @Post('login')
  async login(@Body() body: LoginDto) {
    const token = this.authService.loginUser(body.email, body.password);
    return plainToInstance(TokenDto, token)
  }

  
  @Post('admin/login')
  async loginAdmin(@Body() body: LoginDto) {
    const token = this.authService.loginAdmin(body.email, body.password);
    return plainToInstance(TokenDto, token)
  }


  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@CurrentUser() user: AuthUser) {
    return plainToInstance(AuthUser, user)
  }
}