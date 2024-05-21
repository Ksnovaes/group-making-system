import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from './schemas/group.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{
    name: 'Group',
    schema: GroupSchema
  },{
    name: 'User',
    schema: UserSchema
  }])
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
