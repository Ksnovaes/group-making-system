import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Enter a correct email.' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}