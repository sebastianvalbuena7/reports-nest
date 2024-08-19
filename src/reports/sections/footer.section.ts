import type { Content, ContextPageSize } from "pdfmake/interfaces";

export const footerSection = (currentPage: number, pageCount: number, pageSize: ContextPageSize): Content => {
    return {
        text: `Page ${currentPage} of ${pageCount}`,
        alignment: 'right',
        fontSize: 10,
        margin: [0, 10, 35, 0]
    }
}