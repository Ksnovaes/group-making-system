import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { CreateGroupDTO } from './dto/create-group.dto';

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group.name)
        private groupModel: mongoose.Model<Group>,
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) {}

    async findAll(): Promise<Group[]> {
        const groups = await this.groupModel.find().populate('user', '_id name email');
        return groups
    }

    async createGroup(createGroupDTO: CreateGroupDTO, user: User): Promise<Group> {
        const createdGroup = new this.groupModel({
            ...createGroupDTO,
            user: user._id,
        });
        
        const result = await createdGroup.save();

        user.groups.push(result._id);
        await user.save();

        return result;
    }

    async findById(id: string): Promise<Group> {
        const isValid = mongoose.isValidObjectId(id)

        if (!isValid) {
            throw new BadRequestException('Enter a valid Id.')
        }

        const group = await this.groupModel.findById(id).populate('user', '_id name email');

        if (!group) {
            throw new NotFoundException('Group not found.')
        }

        return group
    }

    async updateGroupById(id: string, group: Group): Promise<Group> {
        return await this.groupModel.findByIdAndUpdate(id, group, {
            new: true,
            runValidators: true
        }).populate('user', '_id name email');
    }

    async deleteGroupById(id: string): Promise<Group> {
        return await this.groupModel.findByIdAndDelete(id).populate('user', '_id name email');
    }
}
