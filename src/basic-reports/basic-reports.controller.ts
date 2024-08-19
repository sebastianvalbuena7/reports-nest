import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) { }

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola mundo pdf'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Employment Letter'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterByIf(
    @Res() response: Response,
    @Param('employeeId', ParseIntPipe) employeeId: number
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(employeeId);

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Employment Letter'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async countriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountry();

    response.setHeader('Content-Type', 'application/pdf');

    pdfDoc.info.Title = 'Countries Report'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}