/** @odoo-module */

const { Component } = owl;

export class MetricCard extends Component {
    get formattedValue() {
        return this.formatNumber(this.props.value, this.props.name);
    }

    formatNumber(num, name) {
        console.log("Nombre:", name);
        console.log("Número:", num);
    
        if (!num) {
            return '0';
        }
    
        if (typeof num === 'string') {
            num = parseFloat(num); // Cambié esto a parseFloat para manejar números decimales
        }
    
        switch (name.trim()) {
            case 'Calidad':
                console.log("Es Calidad");
                return num.toFixed(2) + '%'; // Agregué toFixed(2) para mostrar dos decimales
            case 'Costos':
            case 'Utilidad':
                console.log(name.trim() + " en dólares");
                return '$' + num.toFixed(2).toLocaleString('en-US'); // Agregué toFixed(2) para mostrar dos decimales
            default:
                console.log("Caso no manejado para", name.trim());
                return num.toString();
        }
    }
    
}

MetricCard.template = "TobaccoMetricsPro.MetricCard";
