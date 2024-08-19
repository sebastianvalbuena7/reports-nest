import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { DateFormatter } from "src/helpers"
import { footerSection } from "./sections/footer.section"

const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10, 20]
}

const styles: StyleDictionary = {
    header: {
        fontSize: 18,
        bold: true,
        margin: [0, 30, 0, 0]
    },
    subHeader: {
        fontSize: 18,
        bold: true,
        margin: [0, 30, 0, 0]
    }
}

export const orderByIdReport = (): TDocumentDefinitions => {
    return {
        styles: styles,
        header: logo,
        pageMargins: [40, 60, 40, 60],
        footer: footerSection,
        content: [
            {
                text: 'Tucan Code',
                style: 'header'
            },
            {
                columns: [
                    {
                        text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com'
                    },
                    {
                        text: [
                            {
                                text: `Recibo No. 12456`,
                                bold: true,
                                style: {
                                    fontSize: 13
                                }
                            },
                            `\nFecha del recibo ${DateFormatter.getDDMMMMYYYY(new Date())}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}\n`
                        ],
                        alignment: 'right'
                    }
                ]
            },
            // QR
            {
                qr: 'https://google.com',
                fit: 75,
                alignment: 'right'
            },
            // Direccion cliente
            {
                text: [
                    {
                        text: `Cobrar a: \n`,
                        bold: true,
                        style: 'subHeader'
                    },
                    `Razón Social: Richter Supermarkt
                    Michael Holz 
                    Grenzacherweg 237`
                ]
            }
        ]
    }
}