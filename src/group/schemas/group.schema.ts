import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Group {
    @Prop()
    title: string;

    @Prop()
    description: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group)