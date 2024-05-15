import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './schemas/group.schema';
import { CreateGroupDTO } from './dto/create-group.dto';
import { UpdateGroupDTO } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) {}

    @Get('groups')
    async getAllGroups(): Promise<Group[]> {
        return this.groupService.findAll()
    }

    @Post('create')
    async createGroup(
        @Body()
        group: CreateGroupDTO
    ): Promise<Group> {
        return this.groupService.createGroup(group)
    }

    @Get(':id')
    async findGroupById(
        @Param('id')
        id: string
    ): Promise<Group> {
        return this.groupService.findById(id);
    }

    @Put(':id')
    async updateGroupById(
        @Param('id')
        id: string,
        @Body()
        group: UpdateGroupDTO
    ): Promise<Group> {
        return this.groupService.updateGroupById(id, group);
    }

    @Delete(':id')
    async deleteGroupById(
        @Param('id')
        id: string
    ): Promise<Group> {
        return this.groupService.deleteGroupById(id)
    }
}
