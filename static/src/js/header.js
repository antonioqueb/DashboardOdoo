/** @odoo-module **/

import { Component, tags } from "@odoo/owl";

const { xml } = tags;

class Header extends Component {
    static template = xml/*xml*/ `
        <header>
            <h1>Tobacco Metrics Pro</h1>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </nav>
        </header>
    `;
}

// Verifica si este log aparece en la consola del navegador
console.log("Header component loaded");

// Register the component to be used in the template
odoo.define('TobaccoMetricsPro.header', function (require) {
    return Header;
});
