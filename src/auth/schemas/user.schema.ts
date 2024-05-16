import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Group } from "src/group/schemas/group.schema";


export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female'
}

@Schema({
    timestamps: true
})

export class User extends Document {
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