/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { ChartRenderer } from "../chart_renderer/chart_renderer.js";
import { useService } from "@web/core/utils/hooks"
const { Component, onWillStart, useRef, onMounted, useState } = owl


export class Dashboard extends Component {
  setup(){
    this.state = useState({
        quotations: {
            value:10,
            percentage:6,
        },
        period:90,
    })
    this.orm = useService("orm")
    console.log(this.orm)
    this.actionService = useService("action")
    console.log(this.actionService)
}

  async onChangePeriod(){
    this.getDates()
    await this.getQuotations()
    await this.getOrders()
    console.log(this.state)
    console.log(this.state.orders)


    
  }
    
}

// Loggin para debuggear
console.log("Dashboard component loaded");
console.log(Dashboard)
console.log(Dashboard.template)
console.log(Dashboard.components)
console.log(Dashboard.components.MetricCard)
console.log(Dashboard.components.ChartRenderer)
console.log(Dashboard.components.MetricCard.template)
console.log(Dashboard.components.ChartRenderer.template)
console.log(Dashboard.components.MetricCard.components)
console.log(Dashboard.components.ChartRenderer.components)
console.log(Dashboard.components.MetricCard.components.MetricCard)
console.log(Dashboard.components.ChartRenderer.components.ChartRenderer)

// Set the template and components for the Dashboard component


Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard, ChartRenderer};


// Log to console when adding to the registry to confirm it's being executed   
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);