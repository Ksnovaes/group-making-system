import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Gender } from "../schemas/user.schema";

export class SignUpDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly middleName: string;

    @IsOptional()
    @IsString()
    readonly nickname: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    readonly gender: Gender;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Enter a correct email.' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}