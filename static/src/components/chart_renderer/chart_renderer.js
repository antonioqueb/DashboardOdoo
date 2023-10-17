/** @odoo-module */

import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
const { Component, onWillStart, useRef, onMounted } = owl;

export class ChartRenderer extends Component {
    setup() {
        this.chartRef = useRef("chart");
        this.staticData = {
          'Meses': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            'Ventas netas': [120, 125, 130, 135, 139, 135, 139, 140, 145, 150, 155, 160],
            'Costo neto': [50, 51, 52, 53, 52, 54, 52, 55, 56, 57, 58, 59],
            'Total, Utilidad Bruta': [70, 74, 78, 82, 87, 81, 87, 85, 89, 93, 97, 101],
            'Total, Gasto de admón.': [6, 7, 8, 9, 7, 14, 6, 10, 11, 12, 13, 14],
            'Total, Gasto de Venta': [20, 21, 22, 23, 25, 23, 30, 31, 32, 33, 34, 35],
            'Total, en Gastos': [26, 28, 30, 32, 32, 37, 36, 41, 43, 45, 47, 49],
            'Impuestos Federales': [7, 7, 8, 8, 8, 7, 7, 9, 9, 10, 10, 11],
            'Utilidad Neta': [37, 39, 40, 42, 47, 37, 44, 35, 37, 38, 40, 41],
         };

        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
        });

        onMounted(() => this.renderChart());
    }
    renderChart() {
        const ctx = this.chartRef.el.getContext('2d');

        new Chart(ctx, {
            type: this.props.type,
            data: {
                labels: this.staticData['Meses'].slice(4, 7),  // Selección de los meses de Mayo a Julio
                datasets: [
                    {
                        label: 'Ventas netas',
                        data: this.staticData['Ventas netas'].slice(4, 7),  // Datos de mayo a julio
                        fill: true,
                        backgroundColor: '#0439D9',
                        borderColor: '#027313',
                        tension: 0.1
                    },
                    {
                        label: 'Costo neto',
                        data: this.staticData['Costo neto'].slice(4, 7),  // Datos de mayo a julio
                        fill: true,
                        backgroundColor: '#0460D9',
                        borderColor: '#034001',
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                }
            },
        });
    }

    // Este método puedes utilizarlo para mostrar los datos estáticos en la consola o adaptarlo para mostrarlos en tu interfaz de usuario

    ChartRenderer.template = "TobaccoMetricsPro.ChartRenderer";