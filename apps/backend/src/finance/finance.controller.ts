import { Controller, Get, Query, Param } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('finance')
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get(':churchId/transactions')
  @ApiParam({ name: 'churchId', description: 'Church ID' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getTransactions(
    @Param('churchId') churchId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('category') category?: string,
    @Query('limit') limit?: number,
  ) {
    return this.financeService.getTransactions(churchId, {
      startDate,
      endDate,
      category,
      limit: limit ? parseInt(limit as unknown as string) : undefined,
    });
  }

  @Get(':churchId/donations')
  @ApiParam({ name: 'churchId', description: 'Church ID' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'donorId', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getDonations(
    @Param('churchId') churchId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('donorId') donorId?: string,
    @Query('limit') limit?: number,
  ) {
    return this.financeService.getDonations(churchId, {
      startDate,
      endDate,
      donorId,
      limit: limit ? parseInt(limit as unknown as string) : undefined,
    });
  }

  @Get(':churchId/budgets')
  @ApiParam({ name: 'churchId', description: 'Church ID' })
  async getBudgets(@Param('churchId') churchId: string) {
    return this.financeService.getBudgets(churchId);
  }

  @Get(':churchId/financial-reports/:year')
  @ApiParam({ name: 'churchId', description: 'Church ID' })
  @ApiParam({ name: 'year', description: 'Year for financial reports' })
  async getFinancialReports(
    @Param('churchId') churchId: string,
    @Param('year') year: string,
  ) {
    return this.financeService.getFinancialReports(churchId, parseInt(year));
  }
} 