/** @odoo-module */

import { registry } from "@web/core/registry"
import { loadJS } from "@web/core/assets"
const { Component, onWillStart, useRef, onMounted } = owl

export class ChartRenderer extends Component {
    setup() {
        this.chartRef = useRef("chart")
        this.staticData = {
          'Meses': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            'Ventas netas': [120, 125, 130, 135, 139, 135, 139, 140, 145, 150, 155, 160],
            'Costo neto': [50, 51, 52, 53, 52, 54, 52, 55, 56, 57, 58, 59],
            'Total, Utilidad Bruta': [70, 74, 78, 82, 87, 81, 87, 85, 89, 93, 97, 101],
            'Total, Gasto de admón.': [6, 7, 8, 9, 7, 14, 6, 10, 11, 12, 13, 14],
            'Total, Gasto de Venta': [20, 21, 22, 23, 25, 23, 30, 31, 32, 33, 34, 35],
            'Total, en Gastos': [26, 28, 30, 32, 32, 37, 36, 41, 43, 45, 47, 49],
            'Impuestos Federales': [7, 7, 8, 8, 8, 7, 7, 9, 9, 10, 10, 11],
            'Utilidad Neta': [37, 39, 40, 42, 47, 37, 44, 35, 37, 38, 40, 41
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
                        label: 'Resumen de Resultados',
                        data: this.staticData['Ventas netas'],
                        fill: true,
                        backgroundColor: '#027313',
                        borderColor: '#0439D9',
                        tension: 0.1
                    },
                    {
                        label: 'Resumen de Resultados',
                        data: this.staticData['Costo neto'],
                        fill: true,
                        backgroundColor: '#0460D9',
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
