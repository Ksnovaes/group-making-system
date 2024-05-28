import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './schemas/group.schema';
import { CreateGroupDTO } from './dto/create-group.dto';
import { UpdateGroupDTO } from './dto/update-group.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('groups')
    async getAllGroups(@Req() req): Promise<Group[]> {
        return this.groupService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createGroup(
        @Body() group: CreateGroupDTO,
        @Req() req
    ): Promise<Group> {
        return this.groupService.createGroup(group, req.user);
    }

    @Get(':id')
    async findGroupById(
        @Param('id') id: string
    ): Promise<Group> {
        return this.groupService.findById(id);
    }

    @Put(':id')
    async updateGroupById(
        @Param('id') id: string,
        @Body() group: UpdateGroupDTO
    ): Promise<Group> {
        return this.groupService.updateGroupById(id, group);
    }

    @Delete(':id')
    async deleteGroupById(
        @Param('id') id: string
    ): Promise<Group> {
        return this.groupService.deleteGroupById(id);
    }
}
