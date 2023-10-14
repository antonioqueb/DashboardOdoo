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

// Register the component to be used in the template
odoo.define('TobaccoMetricsPro.header', function (require) {
    return Header;
});
