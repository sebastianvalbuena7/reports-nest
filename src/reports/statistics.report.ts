import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { getDonutChart } from "./charts/donut.chart";
import { headerSection } from "./sections/header.section";
import { getLineChart } from "./charts/line.chart";
import { getBarsChart } from "./charts/bars.chart";

interface TopCountry {
    country: string;
    customers: number;
}

interface ReportOptions {
    title?: string;
    subTitle?: string;
    topCountries: TopCountry[];
}

export const getStatisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {
    const donutChart = await getDonutChart({
        entries: options.topCountries.map((c) => ({
            label: c.country,
            value: c.customers
        }))
    });

    const lineChart = await getLineChart();

    const barsChart = await getBarsChart();

    const docDefinition: TDocumentDefinitions = {
        header: headerSection({
            title: options.title ?? 'Estadisticas de clientes',
            subTitle: options.subTitle ?? 'Top 10 paises con mas clientes'
        }),
        pageMargins: [40, 100, 40, 60],
        content: [
            {
                columns: [
                    {
                        stack: [
                            {
                                text: 'Mejores 10 paises con mas clientes',
                                alignment: 'center',
                                margin: [0, 0, 0, 10]
                            },
                            {
                                image: donutChart,
                                width: 320
                            }
                        ]
                    },
                    {
                        layout: 'lightHorizontalLines',
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            widths: [100, 'auto'],
                            body: [
                                ['Pais', 'Clientes'],
                                ...options.topCountries.map(c => [c.country, c.customers])
                            ]
                        }
                    }
                ]
            },
            {
                image: lineChart,
                width: 500,
                margin: [0, 20]
            },
            {
                image: barsChart,
                width: 500,
                margin: [0, 20]
            }
        ]
    };

    return docDefinition;
}