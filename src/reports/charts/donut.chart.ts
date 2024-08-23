import * as Utils from 'src/helpers/chart-utils';

interface DonutEntry {
    label: string;
    value: number;
}

interface DonutOptions {
    entries: DonutEntry[];
}

export const getDonutChart = async (options: DonutOptions): Promise<string> => {
    const data = {
        labels: options.entries.map(entry => entry.label),
        datasets: [
            {
                label: 'Dataset 1',
                data: options.entries.map(entry => entry.value),
                backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    }

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                position: 'left',
            },
            title: {
                text: 'Hola dona chart',
                display: true
            },
            plugins: {
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 14
                    }    
                }
            }
        },
    };

    return Utils.chartJsToImage(config);
}