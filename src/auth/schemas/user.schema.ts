import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female'
}

@Schema({
    timestamps: true
})

export class User {
    @Prop()
    name: string;

    @Prop()
    middleName: string;

    @Prop()
    nickname: string;

    @Prop()
    gender: Gender;

    @Prop({
        unique: true
    })
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);