/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { loadJS } from "@web/core/assets";

const { Component, tags, onWillStart, useRef, onMounted } = owl;

export class Dashboard extends Component {
    setup () {

        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
        });

    }
}

Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard };


// Log to console when adding to the registry to confirm it's being executed
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);
