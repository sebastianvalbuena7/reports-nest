export class DateFormatter {
    static formmater = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });

    static getDDMMMMYYYY(date: Date): string {
        return this.formmater.format(date);
    }
}