/** @odoo-module */

const { Component } = owl;

export class MetricCard extends Component {
    get formattedValue() {
        return this.formatNumber(this.props.value, this.props.name);
    }

    formatNumber(num, name) {
        if (!num) return '0';

        // Convertir la entrada a un número si es una cadena
        if (typeof num === 'string') num = parseFloat(num);

        let formattedNumber;
        switch (name.trim()) {
            case 'Calidad':
                formattedNumber = num.toFixed(1) + '%';
                break;
            case 'Ventas':
            case 'Costos':
            case 'Utilidad':
                formattedNumber = '$' + num.toLocaleString('es-MX');
                break;
            default:
                formattedNumber = num.toLocaleString();
                break;
        }

        // Logging para depuración - Puedes eliminarlo en producción
        console.log('Nombre:', name);
        console.log('Número:', num);
        console.log('Formateado:', formattedNumber);

        return formattedNumber;
    }
}

MetricCard.template = "TobaccoMetricsPro.MetricCard";
