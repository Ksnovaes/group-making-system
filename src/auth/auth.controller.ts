import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('signup')
    signUp(
        @Body()
        signUpDTO: SignUpDTO
    ): Promise<{ token: string }> {
        return this.authService.signUp(signUpDTO);
    }

    @Get('login')
    login(
        @Body()
        loginDTO: LoginDTO
    ): Promise<{ token: string }>{
        return this.authService.login(loginDTO)
    }
    
    @Get('users')
    async getAllUsers(): Promise<User[]> {
        return this.authService.findUsers();
    }

    @Get(':id')
    async getUserById(
        @Param('id')
        id: string
    ): Promise<User> {
        return this.authService.findUserById(id);
    }

    
}
