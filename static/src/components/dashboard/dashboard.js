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

  }

  async getQuotations(){
    let domain = [['state', 'in', ['sent', 'draft']]]
    if (this.state.period > 0){
        domain.push(['date_order','>', this.state.current_date])
    }
    const data = await this.orm.searchCount("sale.order", domain)
    this.state.quotations.value = data

    // previous period
    let prev_domain = [['state', 'in', ['sent', 'draft']]]
    if (this.state.period > 0){
        prev_domain.push(['date_order','>', this.state.previous_date], ['date_order','<=', this.state.current_date])
    }
    const prev_data = await this.orm.searchCount("sale.order", prev_domain)
    const percentage = ((data - prev_data)/prev_data) * 100
    this.state.quotations.percentage = percentage.toFixed(2)
    console.log(this.state.quotations)
    console.log(this.state.period)
    
}
    
}



// Set the template and components for the Dashboard component


Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard, ChartRenderer};


// Log to console when adding to the registry to confirm it's being executed   
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);