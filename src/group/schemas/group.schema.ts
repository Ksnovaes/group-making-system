import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

@Schema({
    timestamps: true
})

export class Group {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const GroupSchema = SchemaFactory.createForClass(Group)