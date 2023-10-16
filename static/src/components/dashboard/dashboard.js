/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { ChartRenderer } from "../chart_renderer/chart_renderer.js";
import { useService } from "@web/core/utils/hooks.js";

const { Component, tags, onWillStart, useRef, onMounted, useState} = owl;

export class Dashboard extends Component {

// Este código establece el estado inicial de un componente con algunos 
// datos de ventas utilizando el gancho useState.
// code:
    setup () {
        this.state = useState({
            ventas: {
                value: 2421,
                porcentage: 12.2,
            },
            period: 90,
        });

        // Method to connect whit the service ORM of Odoo
        this.orm = useService("orm");


        // Method to get the data of sales
        onWillStart(async () => {
            await this.getQuotations();
        });

    }

    // Metodo manejar el evento click del boton periodo
        onChangePeriod () {
            console.log(this.state.period);
        
        }
   
    // Metodo para obtener los datos de ventas
    async getQuotations () {
        const data = await this.orm.searchCount("sale.order", [
            ["state", "in", ["sale", "done"]]
        ]);
        console.log('Data from getQuotations:', data);  // Agregar esta línea para depurar
        this.state.ventas.value = data;
    }
    

}

Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard, ChartRenderer};



// El código es una adición al registro de acciones de Odoo 
// que agrega el componente Dashboard al registro de acciones con la clave 
// "TobaccoMetricsPro.Dashboard".

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);