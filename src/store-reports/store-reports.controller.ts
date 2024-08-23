import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('order/:orderId')
  async getOrderReport(@Res() response: Response, @Param('orderId', ParseIntPipe) orderId: number) {
    const pdfDoc = await this.storeReportsService.getOrderReportByOrderId(orderId);

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Countries Report'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('svg-charts')
  async getSvgChart(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getSvgChart();

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'SVG Report'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('statistics')
  async statistics(@Res() response: Response) {
    const pdfDoc = await this.storeReportsService.getStatistics();

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Statistics Report'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
