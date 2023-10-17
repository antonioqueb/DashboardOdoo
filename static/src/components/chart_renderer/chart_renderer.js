/** @odoo-module */

import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
const { Component, onWillStart, useRef, onMounted } = owl;

export class ChartRenderer extends Component {
    setup() {
        this.chartRef = useRef("chart");
        this.staticData = {
            'Meses': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            'Ventas netas': [120, 125, 130, 133, 139, 135, 139, 142, 145, 150, 155, 160],
            'Costo neto': [45, 47, 49, 50, 52, 54, 52, 55, 57, 59, 60, 62],
            'Total, Utilidad Bruta': [75, 78, 81, 83, 87, 80, 87, 87, 88, 91, 95, 98],
            'Total, Gasto de admón.': [5, 6, 6, 6, 7, 14, 6, 7, 8, 9, 10, 11],
            'Total, Gasto de Venta': [20, 21, 22, 23, 25, 23, 30, 31, 32, 33, 34, 35],
            'Total, en Gastos': [25, 27, 28, 29, 32, 37, 37, 38, 40, 42, 44, 46],
            'Impuestos Federales': [7, 7, 7, 7, 8, 7, 7, 8, 8, 9, 9, 10],
            'Utilidad Neta': [43, 44, 46, 47, 48, 37, 43, 41, 40, 40, 42, 42]
        };
        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
        });

        onMounted(() => this.renderChart());
    }

    renderChart() {
        const ctx = this.chartRef.el.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.staticData['Meses'],
                datasets: [
                    {
                        label: 'Ventas netas',
                        data: this.staticData['Ventas netas'],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Costo neto',
                        data: this.staticData['Costo neto'],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Utilidad Bruta',
                        data: this.staticData['Total, Utilidad Bruta'],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gasto de admón.',
                        data: this.staticData['Total, Gasto de admón.'],
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gasto de Venta',
                        data: this.staticData['Total, Gasto de Venta'],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Impuestos Federales',
                        data: this.staticData['Impuestos Federales'],
                        backgroundColor: 'rgba(201, 203, 207, 0.2)',
                        borderColor: 'rgba(201, 203, 207, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Utilidad Neta',
                        data: this.staticData['Utilidad Neta'],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Resumen financiero mensual (en millones de pesos mexicanos)',
                        position: 'top',
                    }
                }
            }
        });
    }
}

ChartRenderer.template = "TobaccoMetricsPro.ChartRenderer";
