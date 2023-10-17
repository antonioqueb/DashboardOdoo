/** @odoo-module */

import { registry } from "@web/core/registry"
import { loadJS } from "@web/core/assets"
const { Component, onWillStart, useRef, onMounted } = owl

export class ChartRenderer extends Component {
    setup() {
        this.chartRef = useRef("chart")
        this.staticData = {
            'Meses': ['Mayo', 'Junio', 'Julio', 'Agosto', "Septiembre",'Octubre'],
            'Ventas netas': [139, 135, 139, 140, 143, 150],
            'Costo neto': [52, 54, 52, 35, 40, 45],
            'Total, Utilidad Bruta': [87, 80, 87, 89, 103, 105],
            'Total, Gasto de admón.': [7, 14, 6, 6, 7, 7],
            'Total, Gasto de Venta': [25, 23, 30, 21, 19, 19],
            'Total, en Gastos': [32, 37, 37, 34, 21, 45],
            'Impuestos Federales': [8, 7, 7, 6, 8, 7],
            'Utilidad Neta': [48, 37, 43, 56, 46, 65]
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
                    'Mayo', 'Junio', 'Julio', 'Agosto', "Septiembre",'Octubre'
                ],
                datasets: [
                    {
                        label: 'Resumen de Resultados',
                        data: this.staticData['Ventas netas'],
                        fill: true,
                        backgroundColor: '##0476D9',
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
