/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
const { Component, tags } = owl;

export class Dashboard extends Component {
    constructor() {
        super(...arguments);
        console.log("Dashboard component created");
    }
}

Dashboard.template = "TobaccoMetricsPro.Dashboard";}
Dashboard.components = { MetricCard };


// Log to console when adding to the registry to confirm it's being executed
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);
