/** @odoo-module */

const { Component } = owl;

export class MetricCard extends Component {
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}


MetricCard.template = "TobaccoMetricsPro.MetricCard";