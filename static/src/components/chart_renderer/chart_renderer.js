/** @odoo-module */

import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
const { Component, onWillStart, useRef, onMounted } = owl;

export class ChartRenderer extends Component {
    setup(){
        this.chartRef = useRef("chart");

        onWillStart(async () => {
            try {
                await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
            } catch (error) {
                console.error('Error al cargar la librería Chart.js:', error);
            }
        });

        onMounted(() => {
            if (typeof Chart === "undefined") {
                console.error('Chart.js no se cargó correctamente.');
                return;
            }
            
            try {
                this.renderChart();
            } catch (error) {
                console.error('Error al renderizar el gráfico:', error);
            }
        });   
    }

    renderChart(){
        const colorsHex = [
            "#027333",
            "#7FBF3F",
            "#D3D930",
            "#733A19",
            "#F2F5EE"
        ];

        new Chart(this.chartRef.el, {
            type: this.props.type,
            data: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: colorsHex[0],
                        borderColor: 'rgba(0,0,0,1)',
                        hoverOffset: 4
                    },
                    {
                        label: 'My Second Dataset',
                        data: [100, 70, 150],
                        backgroundColor: colorsHex[1],
                        borderColor: 'rgba(0,0,0,1)',
                        hoverOffset: 4
                    }
                ]
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
}

ChartRenderer.template = "TobaccoMetricsPro.ChartRenderer";
