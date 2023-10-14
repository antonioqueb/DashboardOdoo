/** @odoo-module */

import { registry } from "@web/core/registry";
const { Component, tags } = owl;

export class Dashboard extends Component {
}

Dashboard.template = "TobaccoMetricsPro.dashboard";

registry.category("addons").add("TobaccoMetricsPro", Dashboard);