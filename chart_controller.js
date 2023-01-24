//exemple d'utilisation
//<canvas data-controller="base--chart" data-base--chart-type-value="bar" data-base--chart-data-value='[37, 83, 78, 54, 12, 5, 99]' data-base--chart-label-value=' ["january", "february", "march", "april", "may", "june"]' data-base--chart-param-value='{"label": "My First dataset", "backgroundColor": "rgb(255, 99, 132)", "borderColor": "rgb(255, 99, 132)"}' "></canvas>


import { Controller } from '@hotwired/stimulus'


/* -------------------------------------------------------------------------- */
/*                                  variables                                 */
/* -------------------------------------------------------------------------- */
// data-chart-data-value=...

export default class extends Controller {

    static values = {
        nom: String,
        data: Array,
        label: Array,
        param: Object,
        type: { type: String, default: 'line' }, //type de graphique line, bar, pie, doughnut, polarArea, radar, scatter...
        pointer: String
    }
    /* -------------------------------------------------------------------------- */
    /*                                     use                                    */
    /* -------------------------------------------------------------------------- */
    async connect() {
        let { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle } = await import('chart.js');

        Chart.register(
            ArcElement,
            LineElement,
            BarElement,
            PointElement,
            BarController,
            BubbleController,
            DoughnutController,
            LineController,
            PieController,
            PolarAreaController,
            RadarController,
            ScatterController,
            CategoryScale,
            LinearScale,
            LogarithmicScale,
            RadialLinearScale,
            TimeScale,
            TimeSeriesScale,
            Decimation,
            Filler,
            Legend,
            Title,
            Tooltip,
            SubTitle
        );
        const donnees = {
            labels: this.labelValue,
            datasets: [{
                ...this.paramValue,
                data: this.dataValue
            }]
        };

        const config = {
            type: this.typeValue,
            data: donnees,
            options: {}
        };
        const myChart = new Chart(
            this.element,
            config
        );
    }

}
