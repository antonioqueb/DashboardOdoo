/** @odoo-module */

import { registry } from "@web/core/registry";
import { MetricCard } from "../metric_card/metric_card.js";
import { ChartRenderer } from "../chart_renderer/chart_renderer.js";
import { useService } from "@web/core/utils/hooks"
const { Component, onWillStart, useRef, onMounted, useState } = owl


export class Dashboard extends Component {
  setup(){
    this.state = useState({
        quotations: {},
        period: 90,

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


async getOrders(){
  let domain = [['state', 'in', ['sale', 'done']]]
  if (this.state.period > 0){
      domain.push(['date_order','>', this.state.current_date])
  }
  const data = await this.orm.searchCount("sale.order", domain)
  //this.state.quotations.value = data

  // previous period
  let prev_domain = [['state', 'in', ['sale', 'done']]]
  if (this.state.period > 0){
      prev_domain.push(['date_order','>', this.state.previous_date], ['date_order','<=', this.state.current_date])
  }
  const prev_data = await this.orm.searchCount("sale.order", prev_domain)
  const percentage = ((data - prev_data)/prev_data) * 100
  //this.state.quotations.percentage = percentage.toFixed(2)

  //revenues
  const current_revenue = await this.orm.readGroup("sale.order", domain, ["amount_total:sum"], [])
  const prev_revenue = await this.orm.readGroup("sale.order", prev_domain, ["amount_total:sum"], [])
  const revenue_percentage = ((current_revenue[0].amount_total - prev_revenue[0].amount_total) / prev_revenue[0].amount_total) * 100

  //average
  const current_average = await this.orm.readGroup("sale.order", domain, ["amount_total:avg"], [])
  const prev_average = await this.orm.readGroup("sale.order", prev_domain, ["amount_total:avg"], [])
  const average_percentage = ((current_average[0].amount_total - prev_average[0].amount_total) / prev_average[0].amount_total) * 100

  this.state.orders = {
      value: data,
      percentage: percentage.toFixed(2),
      revenue: `$${(current_revenue[0].amount_total/1000).toFixed(2)}K`,
      revenue_percentage: revenue_percentage.toFixed(2),
      average: `$${(current_average[0].amount_total/1000).toFixed(2)}K`,
      average_percentage: average_percentage.toFixed(2),
  }

  //this.env.services.company
}
    


async viewQuotations(){
  let domain = [['state', 'in', ['sent', 'draft']]]
  if (this.state.period > 0){
      domain.push(['date_order','>', this.state.current_date])
  }

  let list_view = await this.orm.searchRead("ir.model.data", [['name', '=', 'view_quotation_tree_with_onboarding']], ['res_id'])

  this.actionService.doAction({
      type: "ir.actions.act_window",
      name: "Quotations",
      res_model: "sale.order",
      domain,
      views: [
          [list_view.length > 0 ? list_view[0].res_id : false, "list"],
          [false, "form"],
      ]
  })
}

// Card Sales

async viewSales(){
  let domain = [['state', 'in', ['sale']]]
  if (this.state.period > 0){
      domain.push(['date_order','>', this.state.current_date])
  }

  // Obtener las órdenes de venta
  const sales = await this.orm.searchRead("sale.order", domain, ['amount_total']); // Asegúrate de adaptar este código según tus necesidades

  // Calcular el monto total de pagos registrados
  const totalAmount = sales.reduce((total, sale) => total + sale.amount_total, 0);

  // Actualizar el estado con el monto total
  this.state.sales = {
      total: totalAmount.toFixed(), // Formatear a dos decimales, adaptar según sea necesario
      // Actualiza otras propiedades según sea necesario
  };

  let list_view = await this.orm.searchRead("ir.model.data", [['name', '=', 'view_sale_order_tree']], ['res_id']); // Asegúrate de reemplazar 'view_sale_order_tree' con el nombre actual de la vista de lista que deseas usar

  this.actionService.doAction({
      type: "ir.actions.act_window",
      name: "Sales",
      res_model: "sale.order",
      domain,
      views: [
          [list_view.length > 0 ? list_view[0].res_id : false, "list"],
          [false, "form"],
      ]
  });
}




getDates(){
  this.state.current_date = moment().subtract(this.state.period, 'days').format('L')
  this.state.previous_date = moment().subtract(this.state.period * 2, 'days').format('L')
}


viewOrders(){
  let domain = [['state', 'in', ['sale', 'done']]]
  if (this.state.period > 0){
      domain.push(['date_order','>', this.state.current_date])
  }

  this.actionService.doAction({
      type: "ir.actions.act_window",
      name: "Quotations",
      res_model: "sale.order",
      domain,
      context: {group_by: ['date_order']},
      views: [
          [false, "list"],
          [false, "form"],
      ]
  })
}

viewRevenues(){
  let domain = [['state', 'in', ['sale', 'done']]]
  if (this.state.period > 0){
      domain.push(['date_order','>', this.state.current_date])
  }

  this.actionService.doAction({
      type: "ir.actions.act_window",
      name: "Quotations",
      res_model: "sale.order",
      domain,
      context: {group_by: ['date_order']},
      views: [
          [false, "pivot"],
          [false, "form"],
      ]
  })
}

}



// Set the template and components for the Dashboard component


Dashboard.template = "TobaccoMetricsPro.Dashboard";
Dashboard.components = { MetricCard, ChartRenderer};


// Log to console when adding to the registry to confirm it's being executed   
console.log("Adding Dashboard to the registry");

registry.category("actions").add("TobaccoMetricsPro.Dashboard", Dashboard);