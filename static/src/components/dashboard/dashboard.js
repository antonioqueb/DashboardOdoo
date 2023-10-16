/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { ChartRenderer } from "../chart_renderer/chart_renderer.js";
import { useService } from "@web/core/utils/hooks.js";

const { Component, tags, onWillStart, useRef, onMounted, useState} = owl;

export class Dashboard extends Component {

    // Este método se ejecutará durante la fase de configuración del componente.
    setup() {
        console.log('Setup method started');  // Verificar que el método setup se inicia

        // Establecer el estado inicial
        this.state = useState({
            ventas: {
                value: 2421,
                porcentage: 12.2,
            },
            period: 90,
        });
        console.log('Initial state set:', this.state);  // Verificar el estado inicial

        // Conectar con el servicio ORM de Odoo
        this.orm = useService("orm");
        console.log('ORM service connected:', this.orm);  // Verificar la conexión con el servicio ORM

        // Obtener los datos de ventas durante la fase de inicio
        onWillStart(async () => {
            console.log('onWillStart triggered');  // Verificar que onWillStart se dispara
            await this.getQuotations();
        });
    }

    // Método para manejar el evento de clic del botón periodo
    onChangePeriod() {
        console.log('onChangePeriod triggered with period:', this.state.period);  // Verificar que se dispara el evento y mostrar el periodo
    }

    // Método para obtener los datos de ventas
    async getQuotations() {
        console.log('getQuotations method started');  // Verificar que el método getQuotations se inicia

        try {
            const data = await this.orm.searchCount("sale.order", [
                ["state", "in", ["sale", "done"]]
            ]);
            console.log('Data retrieved from ORM:', data);  // Mostrar los datos recuperados del ORM

            this.state.ventas.value = data;
            console.log('Sales data set to state:', this.state.ventas.value);  // Verificar que los datos de ventas se establecen en el estado
        } catch (error) {
            console.error('Error occurred during data retrieval:', error);  // Capturar y mostrar cualquier error que ocurra durante la recuperación de datos
        }
    }
}


Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard, ChartRenderer};



// El código es una adición al registro de acciones de Odoo 
// que agrega el componente Dashboard al registro de acciones con la clave 
// "TobaccoMetricsPro.Dashboard".

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);