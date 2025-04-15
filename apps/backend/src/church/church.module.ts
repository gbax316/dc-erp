import { Module } from '@nestjs/common';
import { ChurchService } from './church.service';
import { ChurchController } from './church.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    FirebaseModule,
  ],
  controllers: [ChurchController],
  providers: [ChurchService],
  exports: [ChurchService],
})
export class ChurchModule {} 