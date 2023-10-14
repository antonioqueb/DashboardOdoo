/** @odoo-module */

import { registry } from "@web/core/registry";
const { Component, tags } = owl;

export class Dashboard extends Component {
    constructor() {
        super(...arguments);
        console.log("Dashboard component created");
    }
}

Dashboard.template = "TobaccoMetricsPro.Dashboard";
console.log(Dashboard.template);

// Log to console when adding to the registry to confirm it's being executed
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);