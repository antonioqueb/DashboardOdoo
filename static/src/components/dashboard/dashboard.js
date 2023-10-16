/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { ChartRenderer } from "../chart_renderer/chart_renderer.js";

const { Component, tags, onWillStart, useRef, onMounted, useState} = owl;

export class Dashboard extends Component {
    setup () {
        this.state = useState({
            ventas: {
                value: 2421,
                porcentage: 12.2,
            }
        });
    }
    
}

Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard, ChartRenderer};


// Log to console when adding to the registry to confirm it's being executed   
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);