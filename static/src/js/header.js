/** @odoo-module **/

import { Component } from "@odoo/owl";
import { xml } from "@odoo/owl";

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

console.log("Header component loaded");

odoo.define('TobaccoMetricsPro.header', function (require) {
    return Header;
});
