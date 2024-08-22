import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { CurrencyFormatter, DateFormatter } from "src/helpers"
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

export interface ReportData {
    order_id: number;
    customer_id: number;
    order_date: Date;
    customers: Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id: number;
    customer_name: string;
    contact_name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    products: Products;
}

export interface Products {
    product_id: number;
    product_name: string;
    category_id: number;
    unit: string;
    price: string;
}


interface ReportValues {
    title?: string;
    subTitle?: string;
    data: ReportData;
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
    const { data } = value;

    const subTotal = data.order_details.reduce((acc, detail) => acc + (detail.quantity * +detail.products.price) , 0);

    const total = subTotal + 1.30;

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
                                text: `Recibo No. ${data.order_id}`,
                                bold: true,
                                style: {
                                    fontSize: 13
                                }
                            },
                            `\nFecha del recibo ${DateFormatter.getDDMMMMYYYY(data.order_date)}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}\n`
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
                    `Razón Social: ${data.customers.customer_name}
                    Contacto: ${data.customers.contact_name}`
                ]
            },
            // Tabla del detalle de la orden
            {
                layout: 'headerLineOnly',
                margin: [0, 30],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Descripcion', 'Cantidad', 'Precio', 'Total'],

                        ...data.order_details.map(detail => [
                            detail.order_detail_id.toString(),
                            detail.products.product_name,
                            detail.quantity.toString(),
                            CurrencyFormatter.formatCurrency(+detail.products.price),
                            {
                                text: CurrencyFormatter.formatCurrency(+detail.products.price * detail.quantity),
                                alignment: 'right'
                            }
                        ])
                    ]
                }
            },

            // Salto de linea
            '\n\n',

            // Totales
            {
                columns: [
                    {
                        width: '*',
                        text: ''
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            body: [
                                [
                                    'Subtotal',
                                    {
                                        text: CurrencyFormatter.formatCurrency(subTotal),
                                        alignment: 'right'
                                    }
                                ],
                                [
                                    {
                                        text: 'Total',
                                        bold: true
                                    },
                                    {
                                        text: CurrencyFormatter.formatCurrency(total),
                                        alignment: 'right',
                                        bold: true
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    }
}