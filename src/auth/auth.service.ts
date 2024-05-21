import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDTO: SignUpDTO): Promise<{ token: string }>{
        const { name, middleName, nickname, gender, email, password } = signUpDTO

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            middleName,
            nickname,
            gender,
            email,
            password: hashedPassword
        })

        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }

    async login(loginDTO: LoginDTO): Promise<{ token: string }> {
        const { email, password } = loginDTO;

        const user = await this.userModel.findOne({ email })

        if (!user) {
            throw new UnauthorizedException('Invalid email or password.')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password.')
        }

        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }

    async findUserById(id: string): Promise<User> {
        const isValid = mongoose.isValidObjectId(id)

        if (!isValid) {
            throw new BadRequestException('Enter a valid Id.')
        }

        const user = await this.userModel.findById(id).populate({
            path: 'groups',
            select: 'title description'
        });

        if (!user) {
            throw new NotFoundException('User not found.')
        }
        
        return user
    }

    async findUsers(): Promise<User[]> {
        const user = await this.userModel.find().populate({
            path: 'groups',
            select: 'title description'
        });
        return user
    }
}
