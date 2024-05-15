import { IsOptional, IsString } from "class-validator";

export class UpdateGroupDTO {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;
}