/** @odoo-module */

const { Component } = owl;

export class MetricCard extends Component {
    get formattedValue() {
        return this.formatNumber(this.props.value, this.props.name);
    }

    formatNumber(num, name) {
        if (!num) return '0';

        // Convertir la entrada a un número si es una cadena.
        if (typeof num === 'string') num = parseFloat(num);

        let formattedNumber;
        switch (name.trim()) {
            case 'Calidad':
            case 'Porcentaje de cumplimiento en RS':
            case 'Crecimiento promedio por producto':
            case 'Cumplimiento Normativo':
            case 'Margen de Utilidad':
            case 'Eficiencia':
            case 'Cuotas del mercado':
            case 'ROI':
                formattedNumber = num.toFixed(1) + '%';
                break;
            case 'Ventas':
            case 'Costo':
            case 'Utilidad':
            case 'Gastos':
            case 'Impuestos':
            case 'Utilidad Neta':

                formattedNumber = '$' + num.toLocaleString('es-MX');
                break;
            default:
                formattedNumber = num.toLocaleString();
                break;
        }



        return formattedNumber;
    }
}

MetricCard.template = "TobaccoMetricsPro.MetricCard";
