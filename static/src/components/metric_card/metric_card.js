/** @odoo-module */

const { Component } = owl;

export class MetricCard extends Component {
    get formattedValue() {
        return this.formatNumber(this.props.value);
    }

    formatNumber(num) {
        if (!num) {
            return '0';
        }
        
        if (typeof num === 'string') {
            num = parseInt(num, 10);
        }

        return num.toLocaleString(); // Utilizar toLocaleString para una formateación más sencilla y confiable
    }
}



MetricCard.template = "TobaccoMetricsPro.MetricCard";