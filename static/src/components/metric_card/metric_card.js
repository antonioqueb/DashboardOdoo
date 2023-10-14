/** @odoo-module */

const { Component } = owl;

export class MetricCard extends Component {
    get formattedValue() {
        return this.formatNumber(this.props.value, this.props.name);
    }

    formatNumber(num, name) {
        if (!num) {
            return '0';
        }

        if (typeof num === 'string') {
            num = parseInt(num, 10);
        }

        // Verifica si el nombre es "Calidad" para manejarlo como un porcentaje
        if (name === "'Calidad'") {
            return num + '%';  // Agrega el símbolo de porcentaje al final del número
        }

        // Para otros casos, agrega el símbolo del dólar
        return '$' + num.toLocaleString('en-US');
    }
}

MetricCard.template = "TobaccoMetricsPro.MetricCard";
