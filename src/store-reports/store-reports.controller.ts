import { Controller, Get, Param } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('order/:orderId')
  async getOrderReport(@Param('orderId') orderId: string) {
    return this.storeReportsService.getOrderReportByOrderId(orderId);
  }
}
