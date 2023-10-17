/** @odoo-module */

import { registry } from "@web/core/registry"
import { loadJS } from "@web/core/assets"
const { Component, onWillStart, useRef, onMounted } = owl

export class ChartRenderer extends Component {
    setup() {
        this.chartRef = useRef("chart")
        this.staticData = {
            'Meses': ['Mayo', 'Junio', 'Julio'],
            'Ventas netas': [139, 135, 139],
            'Costo neto': [52, 54, 52],
            'Total, Utilidad Bruta': [87, 80, 87],
            'Total, Gasto de admón.': [7, 14, 6],
            'Total, Gasto de Venta': [25, 23, 30],
            'Total, en Gastos': [32, 37, 37],
            'Impuestos Federales': [8, 7, 7],
            'Utilidad Neta': [48, 37, 43]
        };
        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js")
        })

        onMounted(() => this.renderChart())
    }

    getGradient(ctx, color1, color2) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }

    renderChart() {
        const ctx = this.chartRef.el.getContext('2d');
        const gradient1 = this.getGradient(ctx, '#0439D9', '#027313');
        const gradient2 = this.getGradient(ctx, '#0460D9', '#034001');

        new Chart(ctx, {
            type: this.props.type,
            data: {
                labels: [
                    'Mayo',
                    'Junio',
                    'Julio'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: this.staticData['Ventas netas'],
                        fill: true,
                        backgroundColor: color2,
                        borderColor: '#0439D9',
                        tension: 0.1
                    },
                    {
                        label: 'My Second Dataset',
                        data: this.staticData['Costo neto'],
                        fill: true,
                        backgroundColor: color1,
                        borderColor: '#0460D9',
                        tension: 0.1
                    }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: this.props.title,
                        position: 'bottom',
                    }
                }
            },
        });
    }

    // Este método puedes utilizarlo para mostrar los datos estáticos en la consola o adaptarlo para mostrarlos en tu interfaz de usuario
    logStaticData() {
        console.table(this.staticData);
    }
}

ChartRenderer.template = "TobaccoMetricsPro.ChartRenderer";
