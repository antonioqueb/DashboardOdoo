/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { loadJS } from "@web/core/assets";

const { Component, tags, onWillStart, useRef, onMounted } = owl;

export class Dashboard extends Component {
    setup () {
        this.chartRef = useRef("chart");
        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
        });

        onMounted(()=>{
            const data = {
                labels: ['Mayo', 'Junio', 'Julio'],
                datasets: [
                    {
                        label: 'Ventas netas',
                        data: [139, 135, 139],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                    {
                        label: 'Costo neto',
                        data: [52, 54, 52],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                    {
                        label: 'Utilidad Bruta',
                        data: [87, 80, 87],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    },
                    {
                        label: 'Gasto de admón.',
                        data: [7, 14, 6],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    },
                    {
                        label: 'Gasto de Venta',
                        data: [25, 23, 30],
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    },
                    {
                        label: 'Gastos Totales',
                        data: [32, 37, 37],
                        backgroundColor: 'rgba(201, 203, 207, 0.2)',
                    },
                    {
                        label: 'Impuestos Federales',
                        data: [8, 7, 7],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    },
                    {
                        label: 'Utilidad Neta',
                        data: [48, 37, 43],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            };
            if (this.chartRef.el) {
                new Chart(this.chartRef.el.getContext('2d'), {
                    type: 'bar',
                    data: data,
                    options: {
                        title: {
                            display: true,
                            text: 'Valores en Mn Mxn (millones)',
                            fontSize: 16
                        },
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true,
                            },
                        },
                    },
                });

            }
        }
        );
    }
}



Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard };


// Log to console when adding to the registry to confirm it's being executed
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);
