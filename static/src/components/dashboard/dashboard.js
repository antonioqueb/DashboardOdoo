/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { loadJS } from "@web/core/assets";

const { Component, hooks } = owl;
const { useRef, onWillStart, onMounted } = hooks;

export class Dashboard extends Component {
    constructor() {
        super(...arguments);
        this.chartRef = useRef("chart");
        this.onWillStart = onWillStart(this.willStart.bind(this));
        this.onMounted = onMounted(this.mounted.bind(this));
    }

    async willStart() {
        await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
    }

    mounted() {
        if (this.chartRef.el && this.props.data) {
            new Chart(this.chartRef.el.getContext('2d'), {
                type: this.props.type || 'bar', // Acepta el tipo de gráfico como una propiedad, 'bar' como default
                data: this.props.data,
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: this.props.title || 'Default Title', // Acepta el título como una propiedad
                            fontSize: 16
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }
}


Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard, ChartRenderer};


// Log to console when adding to the registry to confirm it's being executed   
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);
