/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { ChartRenderer } from "../chart_renderer/chart_renderer.js";
import { useService, useState } from "@web/core/utils/hooks"; // Verifica la importación de useState
import { Component, tags } from "@odoo/owl"; // Verifica la importación de Component y tags

export class Dashboard extends Component {
    setup() {
        this.state = useState({  // Asegúrate de que useState está disponible y es una función
            ventas: {
                title: "Ventas",
                value: 0,
                porcentage: 4,
            },
            period: 90,
        });

        this.orm = useService("orm");

        this.constructor.onWillStart = async () => {
            await this.getQuotations();
        };
    }
    
    async onChangePeriod(ev) {
        this.state.date = moment().subtract(this.state.period, "days").format("L");
        await this.getQuotations();
    }

    async getQuotations() {
        const data = await this.orm.searchCount("sale.order", [['state', 'in', ['sale', 'done']], ['date_order', '>=', this.state.date]]);
        this.state.ventas.value = data;
    }
}

Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard, ChartRenderer };

console.log("Adding Dashboard to the registry");
registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);
