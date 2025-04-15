import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    FirebaseModule,
  ],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {} 