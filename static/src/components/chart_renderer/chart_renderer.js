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
            if (this.chartRef.el && this.props.data) {
                new Chart(this.chartRef.el.getContext('2d'), {
                    type: this.props.type, // Aceptar el tipo de gráfico como una propiedad
                    data: this.props.data,
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: this.props.title, // Aceptar el título como una propiedad
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

const myData = {
    labels: ['Mayo', 'Junio', 'Julio'],
    datasets: [
        {
            label: 'Ventas netas',
            data: [139, 135, 139],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Costo neto',
            data: [52, 54, 52],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
            label: 'Utilidad Bruta',
            data: [87, 80, 87],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        },
        {
            label: 'Gasto de admón.',
            data: [7, 14, 6],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        },
        {
            label: 'Gasto de Venta',
            data: [25, 23, 30],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        },
        {
            label: 'Gastos Totales',
            data: [32, 37, 37],
            backgroundColor: 'rgba(201, 203, 207, 0.2)',
            borderColor: 'rgba(201, 203, 207, 1)',
            borderWidth: 1
        },
        {
            label: 'Impuestos Federales',
            data: [8, 7, 7],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Utilidad Neta',
            data: [48, 37, 43],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }
    ]
};

const myDataProductos = {
    labels: ['Mayo', 'Junio', 'Julio'],
    datasets: [
        {
            label: 'Económicos',
            data: [486, 430, 397],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Laredo',
            data: [103, 117, 103],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
            label: 'Península',
            data: [30, 13, 26],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        },
        {
            label: 'Studio 54',
            data: [97, 88, 176],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        },
        {
            label: 'Senator',
            data: [42, 26, 24],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        },
        // Puedes añadir más productos aquí...
    ]
};


ChartRenderer.template = "TobaccoMetricsPro.ChartRenderer";
