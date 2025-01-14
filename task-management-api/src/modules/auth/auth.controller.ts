import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): AuthResponseDto {
    return this.authService.signIn(username, password);
  }
}
