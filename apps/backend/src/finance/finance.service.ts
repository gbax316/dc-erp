import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FinanceService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async getTransactions(churchId: string, options: any = {}) {
    const { startDate, endDate, category, limit = 20 } = options;
    
    let conditions: [string, any, any][] = [
      ['churchId', '==', churchId],
    ];
    
    if (startDate) {
      conditions.push(['date', '>=', startDate]);
    }
    
    if (endDate) {
      conditions.push(['date', '<=', endDate]);
    }
    
    if (category) {
      conditions.push(['category', '==', category]);
    }
    
    return this.firebaseService.queryCollection(
      'transactions',
      conditions,
      ['date', 'desc'],
      limit
    );
  }

  async getDonations(churchId: string, options: any = {}) {
    const { startDate, endDate, donorId, limit = 20 } = options;
    
    let conditions: [string, any, any][] = [
      ['churchId', '==', churchId],
    ];
    
    if (startDate) {
      conditions.push(['date', '>=', startDate]);
    }
    
    if (endDate) {
      conditions.push(['date', '<=', endDate]);
    }
    
    if (donorId) {
      conditions.push(['donorId', '==', donorId]);
    }
    
    return this.firebaseService.queryCollection(
      'donations',
      conditions,
      ['date', 'desc'],
      limit
    );
  }

  async getBudgets(churchId: string) {
    return this.firebaseService.queryCollection(
      'budgets',
      [['churchId', '==', churchId]],
      ['year', 'desc']
    );
  }

  async getFinancialReports(churchId: string, year: number) {
    return this.firebaseService.queryCollection(
      'financialReports',
      [
        ['churchId', '==', churchId],
        ['year', '==', year]
      ],
      ['month', 'asc']
    );
  }
} 