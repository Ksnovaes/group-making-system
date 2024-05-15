import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group.name)
        private groupModel: mongoose.Model<Group>,
    ) {}

    async findAll(): Promise<Group[]> {
        const groups = await this.groupModel.find();
        return groups
    }

    async createGroup(group: Group): Promise<Group> {
        const res = await this.groupModel.create(group);
        return res
    }

    async findById(id: string): Promise<Group> {
        const group = await this.groupModel.findById(id);

        if (!group) {
            throw new NotFoundException('Group not found.')
        }

        return group
    }

    async updateGroupById(id: string, group: Group): Promise<Group> {
        return await this.groupModel.findByIdAndUpdate(id, group, {
            new: true,
            runValidators: true
        });
    }

    async deleteGroupById(id: string): Promise<Group> {
        return await this.groupModel.findByIdAndDelete(id);
    }
}
