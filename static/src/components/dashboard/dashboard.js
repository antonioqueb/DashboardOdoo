/** @odoo-module */

import { registry } from "@web/core/registry"
import { MetricCard } from "./metric_card/metric_card"
import { ChartRenderer } from "./chart_renderer/chart_renderer"
import { loadJS } from "@web/core/assets"
const { Component, onWillStart, useRef, onMounted } = owl

export class Dashboard extends Component {
    setup(){

    }
}

Dashboard.template = "TobaccoMetricsPro.Dashboard"
Dashboard.components = { MetricCard, ChartRenderer }

registry.category("actions").add("TobaccoMetricsPro.dashboard", Dashboard)