import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { countries as Country } from "@prisma/client";
import { footerSection } from "./sections/footer.section";

interface ReportOptions {
    title?: string;
    subTitle?: string;
    countries: Country[];
}

export const getCountriesReport = (options: ReportOptions): TDocumentDefinitions => {
    const { title, subTitle, countries } = options;

    return {
        pageOrientation: 'landscape',
        header: headerSection({
            title: 'Countries Report',
            subTitle: 'List of countries',
            showLogo: true
        }),
        footer: footerSection,
        pageMargins: [40, 110, 40, 60],
        content: [
            {
                // layout: 'lightHorizontalLines',
                layout: 'customLayout01',
                table: {
                    headerRows: 1,
                    widths: [50, 50, 50, '*', 'auto', '*'],

                    body: [
                        ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
                        ...countries.map((country) => [
                            country.id.toString(),
                            country.iso2,
                            country.iso3,
                            { text: country.name, bold: true },
                            country.continent,
                            country.local_name
                        ]),

                        ['', '', '', '', '', ''],
                        ['', '', '', '', 'Total',
                            {
                                text: `${countries.length}`,
                                bold: true
                            }
                        ]
                    ]
                }
            },

            // Tabla de totales
            {
                text: 'Totales',
                style: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 40, 0, 0]
                }
            },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 1,
                    widths: [50, 50, 50, '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'Total de paises',
                                colSpan: 3,
                                bold: true
                            },
                            {},
                            {},
                            {
                                text: `${countries.length.toString()} paises`,
                                bold: true
                            },
                            {},
                            {}
                        ]
                    ]
                }
            }
        ]
    };
}