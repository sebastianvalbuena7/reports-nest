import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getCountriesReport, getEmploymentLetter, getEmploymentLetterById, getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    constructor(
        private readonly printerService: PrinterService
    ) {
        super()
    }

    hello() {
        const docDefinition = getHelloWorldReport({
            name: 'Sebastian'
        });

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    employmentLetter() {
        const docDefinition = getEmploymentLetter(
            // {
            //     name: 'Sebastian'
            // }
        );

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    async employmentLetterById(employeeId: number) {
        const employee = await this.employees.findUnique({
            where: {
                id: employeeId
            }
        });

        if (!employee) throw new NotFoundException(`Employee with id ${employeeId} not found`);

        const docDefinition = getEmploymentLetterById({
            employerName: 'Sebastian Valbuena',
            employerPosition: 'Software Engineer',
            employeeName: employee.name,
            employeePosition: employee.position,
            employeeStartDate: employee.start_date,
            employeeHours: employee.hours_per_day,
            employeeWorkSchedule: employee.work_schedule,
            employerCompany: 'Fazt Tech'
        });

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    async getCountry() {
        const countries = await this.countries.findMany({
            where: {
                local_name: {
                    not: null
                }
            }
        });

        const docDefinition = getCountriesReport({
            countries
        });

        return this.printerService.createPdf(docDefinition);
    }
}