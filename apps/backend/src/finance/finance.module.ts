import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    FirebaseModule,
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService],
})
export class FinanceModule {} 