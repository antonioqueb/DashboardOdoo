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

        const gradient11 = this.getGradient(ctx, '#89a1cf', '#299b45');
        const gradient12 = this.getGradient(ctx, '#a698b9', '#394e67');
        const gradient13 = this.getGradient(ctx, '#6979a3', '#299b45');
        const gradient14 = this.getGradient(ctx, '#89a1cf', '#394e67');
        const gradient15 = this.getGradient(ctx, '#a698b9', '#6979a3');

        const gradient16 = this.getGradient(ctx, '#394e67', '#6979a3');
        const gradient17 = this.getGradient(ctx, '#89a1cf', '#a698b9');
        const gradient18 = this.getGradient(ctx, '#299b45', '#394e67');
        const gradient19 = this.getGradient(ctx, '#a698b9', '#89a1cf');
        const gradient20 = this.getGradient(ctx, '#6979a3', '#394e67');

        const gradient21 = this.getGradient(ctx, '#394e67', '#89a1cf');
        const gradient22 = this.getGradient(ctx, '#6979a3', '#a698b9');
        const gradient23 = this.getGradient(ctx, '#89a1cf', '#299b45');
        const gradient24 = this.getGradient(ctx, '#a698b9', '#394e67');
        const gradient25 = this.getGradient(ctx, '#6979a3', '#299b45');
        const gradient26 = this.getGradient(ctx, '#89a1cf', '#394e67');
        const gradient27 = this.getGradient(ctx, '#a698b9', '#6979a3');
        const gradient28 = this.getGradient(ctx, '#394e67', '#89a1cf');
        const gradient29 = this.getGradient(ctx, '#6979a3', '#a698b9');
        const gradient30 = this.getGradient(ctx, '#89a1cf', '#299b45')

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
                        backgroundColor: ['#0439D9', '#395ab9', gradient1, gradient1, gradient4, gradient5],
                        borderColor: '#183b9c',
                        tension: 0.1
                    },
                    {
                        label: 'Resumen de Resultados',
                        data: this.staticData['Costo neto'],
                        fill: true,
                        backgroundColor: ['#0439D9', '#395ab9', gradient1, gradient1, gradient4, gradient5],
                        borderColor: '#297eea',
                        tension: 0.1
                    }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',

                    },
                    title: {
                        display: true,
                        text: this.props.title,
                        position: 'bottom',
                    },
                    tooltip: {
                        backgroundColor: '#183b9c',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        titleFont: {
                            size: 15,
                            weight: 'bold'
                        },

                        }
                    }
                }
            });
    }
}

ChartRenderer.template = "TobaccoMetricsPro.ChartRenderer";
