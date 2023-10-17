/** @odoo-module */

import { Component, onWillStart, useRef, onMounted } from 'owl';
import { loadJS } from "@web/core/assets";

export class MetricCard extends Component {
    constructor() {
        super(...arguments);
        this.chartRef = useRef("chart");
        onWillStart(this.loadChartJS);
        onMounted(this.renderChart);
    }

    async loadChartJS() {
        await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js");
        await loadJS("https://cdn.jsdelivr.net/npm/chartjs-plugin-gauge");
    }

    renderChart() {
        const ctx = this.chartRef.el.getContext('2d');
        new Chart(ctx, {
            type: 'gauge',
            data: {
                datasets: [{
                    value: this.props.value,
                    data: [{value: this.props.value}],  // actualizar según la necesidad
                    backgroundColor: ['red', 'orange', 'yellow', 'green'],
                    borderWidth: 0
                }]
            },
            options: {
                plugins: {
                    gauge: {
                        valueDomain: [0, 100],
                        valueLineCap: 'round'
                    }
                }
            }
        });
    }

    get formattedValue() {
        return this.formatNumber(this.props.value, this.props.name);
    }

    formatNumber(num, name) {
        if (!num) return '0';
        if (typeof num === 'string') num = parseFloat(num);

        let formattedNumber;
        switch (name.trim()) {
            case 'Calidad':
                formattedNumber = num.toFixed(1) + '%';
                break;
            case 'Ventas':
            case 'Costos':
            case 'Utilidad':
                formattedNumber = '$' + num.toLocaleString('es-MX');
                break;
            default:
                formattedNumber = num.toLocaleString();
                break;
        }

        return formattedNumber;
    }
}

MetricCard.template = "TobaccoMetricsPro.MetricCard";
