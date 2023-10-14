/** @odoo-module */

const { Component } = owl;

export class MetricCard extends Component {
    get formattedValue() {
        return this.formatNumber(this.props.value, this.props.name);
    }

    formatNumber(num, name) {
        console.log("Nombre:", name);  // Añade un log para verificar el valor de name
        console.log("Número:", num);  // Añade un log para verificar el valor de num

        if (!num) {
            return '0';
        }

        if (typeof num === 'string') {
            num = parseInt(num, 10);
        }

        // Verifica si el nombre es 'Calidad' para manejarlo como un porcentaje
        if (name.trim() === "'Calidad'") {
            console.log("Es Calidad");
            return num + '%';
        } else {
            console.log("No es Calidad");
        }

        // Para otros casos, agrega el símbolo del dólar
        return '$' + num.toLocaleString('en-US');
    }
}

MetricCard.template = "TobaccoMetricsPro.MetricCard";
